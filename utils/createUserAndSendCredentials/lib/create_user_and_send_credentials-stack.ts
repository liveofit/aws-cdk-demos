import * as cdk from "@aws-cdk/core";
import * as iam from "@aws-cdk/aws-iam";
import { config } from "../config";
import { CfnOutput, SecretValue } from "@aws-cdk/core";
import { CfnAccessKey } from "@aws-cdk/aws-iam";

const awsConfig = {
  env: {
    account: config.account,
    region: config.region,
  },
};

export class CreateUserAndSendCredentialsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, { ...props, ...awsConfig });

    // 👇 Create group
    const group = new iam.Group(this, config.iamGroup, {
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess"),
      ],
    });

    // 👇 Create User
    const users = config.iamUsers.map(
      (user) =>
        new iam.User(this, user, {
          userName: user,
          password: SecretValue.plainText(config.defaultPassword),
          passwordResetRequired: true,
          groups: [group],
        })
      // const accessKey = new CfnAccessKey(this, `${user}AccessKey`, {
      //   userName: user.userName,
      // });
      // const cfn1 = new CfnOutput(this, `${user}-accessKeyId`, {
      //   value: accessKey.ref,
      // });
      // const cfn2 = new CfnOutput(this, `${user}-secretAccessKey`, {
      //   value: accessKey.attrSecretAccessKey,
      // });
    );
  }
}
