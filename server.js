require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { google } = require('googleapis');
const { Readable } = require('stream');
const path = require('path');

const PORT = process.env.PORT || 3000;
const GOOGLE_CLIENT_ID = (process.env.GOOGLE_CLIENT_ID || '').trim();
const GOOGLE_CLIENT_SECRET = (process.env.GOOGLE_CLIENT_SECRET || '').trim();
const GOOGLE_REFRESH_TOKEN = (process.env.GOOGLE_REFRESH_TOKEN || '').trim();
const GOOGLE_DRIVE_FOLDER_ID = (process.env.GOOGLE_DRIVE_FOLDER_ID || '').trim();

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

app.get('/api/gallery-link', (req, res) => {
  if (!GOOGLE_DRIVE_FOLDER_ID) {
    return res.status(503).json({ error: 'Google Drive ist noch nicht konfiguriert.' });
  }
  res.json({ url: `https://drive.google.com/drive/folders/${GOOGLE_DRIVE_FOLDER_ID}` });
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
