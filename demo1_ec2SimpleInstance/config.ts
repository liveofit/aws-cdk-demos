import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  region: process.env.AWS_REGION as string,
  account: process.env.AWS_ACCOUNT_NUMBER as string,
  instanceName: process.env.INSTANCE_NAME || "simple-instance"
}