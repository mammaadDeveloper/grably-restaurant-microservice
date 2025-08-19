import { registerAs } from '@nestjs/config';
export default registerAs('app', () => ({
  port: parseInt(process.env.AUTH_SERVICE_PORT || process.env.PORT || '', 10) || 3002
}));
