import { z } from 'zod';
import { getDb } from '../config/db.js';

const createBillingSchema = z.object({
  patient_id: z.number().int().positive(),
  amount: z.number().positive()
});

const paySchema = z.object({
  payment_mode: z.enum(['cash', 'card', 'upi', 'insurance'])
});

export const createBilling = async (req, res) => {
  const parsed = createBillingSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid payload', errors: parsed.error.flatten() });

  const db = await getDb();
  const result = await db.run('INSERT INTO billing (patient_id, amount, status) VALUES (?, ?, ?)', [
    parsed.data.patient_id,
    parsed.data.amount,
    'pending'
  ]);

  return res.status(201).json({ id: result.lastID, status: 'pending' });
};

export const payBilling = async (req, res) => {
  const parsed = paySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid payload', errors: parsed.error.flatten() });

  const db = await getDb();
  const bill = await db.get('SELECT * FROM billing WHERE id = ?', req.params.id);
  if (!bill) return res.status(404).json({ message: 'Billing record not found' });

  await db.run('UPDATE billing SET status = ?, payment_mode = ? WHERE id = ?', ['paid', parsed.data.payment_mode, req.params.id]);
  await db.run('UPDATE patients SET current_stage = ?, status = ? WHERE id = ?', ['completed', 'completed', bill.patient_id]);

  return res.json({ message: 'Payment recorded and patient workflow completed' });
};
