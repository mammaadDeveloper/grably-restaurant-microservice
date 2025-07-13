import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port:
    parseInt(process.env.USERS_SERVICE_PORT || process.env.PORT || '', 10) ||
    3001,
}));
