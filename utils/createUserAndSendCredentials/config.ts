import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  region: process.env.AWS_REGION as string,
  account: process.env.AWS_ACCOUNT_NUMBER as string,
  iamGroup: process.env.IAM_GROUP as string,
  iamUsers: process.env.IAM_USERS?.split(",") as string[],
  defaultPassword: process.env.DEFAULT_PASSWORD as string
}