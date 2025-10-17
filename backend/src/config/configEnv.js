"use strict";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DATABASE,
  HOST,
  PORT,
  JWT_SECRET,    // ← ASEGÚRATE de exportar esto
  COOKIE_KEY
} = process.env;

export const PASSWORD = DB_PASSWORD;