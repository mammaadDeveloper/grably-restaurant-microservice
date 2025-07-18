import { registerAs } from "@nestjs/config";

export default registerAs('db', () => ({
  url: process.env.DATABASE_URL || process.env.TOKEN_SERVICE_DATABASE_URL || 'postgresql://localhost:5432/db'
}));
