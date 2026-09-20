require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { google } = require('googleapis');
const { Readable } = require('stream');
const path = require('path');

const PORT = process.env.PORT || 3000;
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  GOOGLE_DRIVE_FOLDER_ID,
} = process.env;

const driveConfigured = Boolean(
  GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET && GOOGLE_REFRESH_TOKEN && GOOGLE_DRIVE_FOLDER_ID
);

function getDriveClient() {
  const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
  oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
  return google.drive({ version: 'v3', auth: oauth2Client });
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 10 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Nur Bilddateien sind erlaubt.'));
    }
    cb(null, true);
  },
});

const PUBLIC_DIR = path.join(__dirname, 'public');

const app = express();
app.use(express.static(PUBLIC_DIR));

app.get('/api/photos', async (req, res) => {
  if (!driveConfigured) {
    return res.status(503).json({ error: 'Google Drive ist noch nicht konfiguriert.' });
  }

  try {
    const drive = getDriveClient();
    const result = await drive.files.list({
      q: `'${GOOGLE_DRIVE_FOLDER_ID}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: 'files(id, name, createdTime)',
      orderBy: 'createdTime desc',
      pageSize: 200,
    });

    const photos = (result.data.files || []).map((file) => ({
      id: file.id,
      name: file.name,
      createdTime: file.createdTime,
      thumbUrl: `https://drive.google.com/thumbnail?id=${file.id}&sz=w400`,
      fullUrl: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1600`,
    }));

    res.json({ photos });
  } catch (err) {
    console.error('Fehler beim Laden der Galerie:', err.message);
    res.status(500).json({ error: 'Galerie konnte nicht geladen werden.' });
  }
});

app.post('/api/photos', upload.array('photos', 10), async (req, res) => {
  if (!driveConfigured) {
    return res.status(503).json({ error: 'Google Drive ist noch nicht konfiguriert.' });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'Keine Dateien empfangen.' });
  }

  try {
    const drive = getDriveClient();

    const uploaded = await Promise.all(
      req.files.map(async (file) => {
        const created = await drive.files.create({
          requestBody: {
            name: `${Date.now()}-${file.originalname}`,
            parents: [GOOGLE_DRIVE_FOLDER_ID],
          },
          media: {
            mimeType: file.mimetype,
            body: Readable.from(file.buffer),
          },
          fields: 'id',
        });

        await drive.permissions.create({
          fileId: created.data.id,
          requestBody: { role: 'reader', type: 'anyone' },
        });

        return created.data.id;
      })
    );

    res.json({ uploaded: uploaded.length });
  } catch (err) {
    console.error('Fehler beim Hochladen:', err.message);
    res.status(500).json({ error: 'Upload fehlgeschlagen.' });
  }
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message.includes('Bilddateien')) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}${driveConfigured ? '' : ' (Google Drive noch NICHT konfiguriert)'}`);
});
