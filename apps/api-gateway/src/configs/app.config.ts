import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.GATEWAY_PORT || process.env.PORT || '', 10) || 3000,
}));
