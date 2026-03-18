import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { query } from '../db.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE || '52428800') },
  fileFilter: (_req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|gif|webp|svg|avif|mp4|webm|mov)$/i;
    if (allowed.test(path.extname(file.originalname))) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed'));
    }
  },
});

const router = Router();

// Отдача файла из БД
router.get('/serve/:id', async (req: Request, res: Response) => {
  try {
    const result = await query(
      'SELECT file_name, file_type, file_data FROM media WHERE id=$1',
      [req.params.id]
    );
    if (result.rows.length === 0 || !result.rows[0].file_data) {
      res.status(404).json({ error: 'File not found' });
      return;
    }

    const file = result.rows[0];
    res.set('Content-Type', file.file_type || 'application/octet-stream');
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(file.file_data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Список файлов (без file_data чтобы не грузить)
router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await query(
      'SELECT id, file_name, file_url, file_type, file_size, uploaded_by, created_at FROM media ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file provided' });
      return;
    }

    const result = await query(
      `INSERT INTO media (file_name, file_url, file_type, file_size, file_data, uploaded_by)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, file_name, file_url, file_type, file_size, created_at`,
      [req.file.originalname, '', req.file.mimetype, req.file.size, req.file.buffer, null]
    );

    const fileUrl = `/api/media/serve/${result.rows[0].id}`;
    await query('UPDATE media SET file_url=$1 WHERE id=$2', [fileUrl, result.rows[0].id]);
    result.rows[0].file_url = fileUrl;

    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/upload-to-path', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file provided' });
      return;
    }

    const result = await query(
      `INSERT INTO media (file_name, file_url, file_type, file_size, file_data, uploaded_by)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [req.file.originalname, '', req.file.mimetype, req.file.size, req.file.buffer, null]
    );

    const fileUrl = `/api/media/serve/${result.rows[0].id}`;
    await query('UPDATE media SET file_url=$1 WHERE id=$2', [fileUrl, result.rows[0].id]);

    res.status(201).json({ publicUrl: fileUrl, filename: req.file.originalname });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT id FROM media WHERE id=$1', [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'File not found' });
      return;
    }

    await query('DELETE FROM media WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
