import { registerAs } from "@nestjs/config";

export default registerAs('users', () => ({
  package: process.env.USERS_GRPC_PACKAGE || 'users',
  url: process.env.USERS_GRPC_URL || 'locahost:50051'
}));
