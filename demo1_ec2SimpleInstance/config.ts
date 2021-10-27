import * as dotenv from "dotenv";
import * as path from 'path';

dotenv.config();

export const config = {
  region: process.env.AWS_REGION as string,
  account: process.env.AWS_ACCOUNT as string,
}