import { registerAs } from '@nestjs/config';
import { APPLICATION_CONFIG } from "./constants";

export default registerAs(APPLICATION_CONFIG, () => ({
  port: Number(process.env.PORT),
  environment: process.env.ENV,
}));
