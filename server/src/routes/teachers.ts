import { Router, Request, Response } from 'express';
import { query } from '../db.js';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const published = req.query.published;
    let sql = 'SELECT * FROM teachers';
    if (published === 'true') {
      sql += ' WHERE is_published = true';
    }
    sql += ' ORDER BY display_order ASC NULLS LAST, created_at DESC';
    const result = await query(sql);
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { full_name, position, bio, expertise, experience, photo_url, display_order, is_published } = req.body;
    const result = await query(
      `INSERT INTO teachers (full_name, position, bio, expertise, experience, photo_url, display_order, is_published)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [full_name, position || null, bio || null, expertise || null, experience || null, photo_url || null, display_order || 0, is_published ?? true]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { full_name, position, bio, expertise, experience, photo_url, display_order, is_published } = req.body;
    const result = await query(
      `UPDATE teachers SET full_name=$1, position=$2, bio=$3, expertise=$4, experience=$5, photo_url=$6, display_order=$7, is_published=$8, updated_at=CURRENT_TIMESTAMP
       WHERE id=$9 RETURNING *`,
      [full_name, position || null, bio || null, expertise || null, experience || null, photo_url || null, display_order || 0, is_published ?? true, req.params.id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Teacher not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id/publish', async (req: Request, res: Response) => {
  try {
    const { is_published } = req.body;
    const result = await query(
      'UPDATE teachers SET is_published=$1, updated_at=CURRENT_TIMESTAMP WHERE id=$2 RETURNING *',
      [is_published, req.params.id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Teacher not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('DELETE FROM teachers WHERE id=$1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Teacher not found' });
      return;
    }
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
