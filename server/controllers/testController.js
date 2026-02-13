import { getDb } from '../config/db.js';

const testDurations = {
  vision: 5,
  refraction: 10,
  iop: 5,
  oct: 15,
  field: 20,
  preop: 25
};

export const startTest = async (req, res) => {
  const db = await getDb();
  const test = await db.get('SELECT * FROM tests WHERE id = ?', req.params.id);
  if (!test) return res.status(404).json({ message: 'Test not found' });

  await db.run('UPDATE tests SET status = ?, start_time = CURRENT_TIMESTAMP WHERE id = ?', ['in_progress', req.params.id]);
  await db.run('UPDATE patients SET current_stage = ?, status = ? WHERE id = ?', ['screening', 'in_progress', test.patient_id]);

  return res.json({ message: 'Test started', expected_duration_min: testDurations[test.test_type] || null });
};

export const completeTest = async (req, res) => {
  const db = await getDb();
  const test = await db.get('SELECT * FROM tests WHERE id = ?', req.params.id);
  if (!test) return res.status(404).json({ message: 'Test not found' });

  await db.run('UPDATE tests SET status = ?, end_time = CURRENT_TIMESTAMP WHERE id = ?', ['completed', req.params.id]);
  await db.run('UPDATE patients SET current_stage = ?, status = ? WHERE id = ?', ['doctor', 'waiting', test.patient_id]);
  await db.run(
    'INSERT INTO logs (user_id, action, patient_id) VALUES (?, ?, ?)',
    [req.user.id, `Completed ${test.test_type} test`, test.patient_id]
  );

  return res.json({ message: 'Test completed and patient moved to doctor queue' });
};

export const waitingTests = async (_req, res) => {
  const db = await getDb();
  const tests = await db.all(
    `SELECT t.*, p.name AS patient_name, p.priority_level
     FROM tests t
     JOIN patients p ON p.id = t.patient_id
     WHERE t.status != 'completed'
     ORDER BY
       CASE p.priority_level
         WHEN 'emergency' THEN 1
         WHEN 'vip' THEN 2
         WHEN 'senior' THEN 3
         ELSE 4
       END,
       p.token_number ASC`
  );
  return res.json(tests);
};
