import { registerAs } from '@nestjs/config';
import { APPLICATION_CONFIG } from "./constants";

export default registerAs(APPLICATION_CONFIG, () => ({
  port: process.env.PORT,
}));
