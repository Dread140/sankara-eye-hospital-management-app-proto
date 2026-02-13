import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

let db;

export const getDb = async () => {
  if (db) return db;

  await fs.mkdir(path.resolve(rootDir, 'server/data'), { recursive: true });

  db = await open({
    filename: path.resolve(rootDir, 'server/data/hospital.db'),
    driver: sqlite3.Database
  });

  await db.exec('PRAGMA foreign_keys = ON');
  const schema = await fs.readFile(path.resolve(rootDir, 'database/schema.sql'), 'utf8');
  await db.exec(schema);

  return db;
};
