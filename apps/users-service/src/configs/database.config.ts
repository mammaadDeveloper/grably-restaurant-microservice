import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  url:
    process.env.USERS_SERVICE_DATABASE_URL ||
    process.env.DATABASE_URL ||
    'postgresql://localhost:5432/myapp',
}));
