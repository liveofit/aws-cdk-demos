import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2"; // import ec2 library
import * as iam from "@aws-cdk/aws-iam"; // import iam library for permissions
import { KeyPair } from "cdk-ec2-key-pair";
import { config } from "../config";
import { readFileSync } from "fs";
import * as path from 'path'

const awsConfig = {
  env: {
    account: config.account,
    region: config.region,
  },
};

export class Demo1Ec2SimpleInstanceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    // its important to add our env config here otherwise CDK won't know our AWS account number
    super(scope, id, { ...props,  ...awsConfig });

    // Get the default VPC. This is the network where your instance will be provisioned
    // All activated regions in AWS have a default vpc.
    // You can create your own of course as well. https://aws.amazon.com/vpc/
    const defaultVpc = ec2.Vpc.fromLookup(this, "VPC", { isDefault: true });

    // Lets create a role for the instance
    // You can attach permissions to a role and determine what your
    // instance can or can not do
    const role = new iam.Role(
      this,
      "role", // this is a unique id that will represent this resource in a Cloudformation template
      { assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com") }
    );

    // lets create a security group for our instance
    // A security group acts as a virtual firewall for your instance to control inbound and outbound traffic.
    const securityGroup = new ec2.SecurityGroup(
      this,
      `sg`,
      {
        vpc: defaultVpc,
        allowAllOutbound: true, // will let your instance send outboud traffic
        securityGroupName: `sg`,
      }
    );

    // lets use the security group to allow inbound traffic on specific ports
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      "Allows SSH access from Internet"
    );

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(880),
      "Allows Http Webserver access from Internet"
    );

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(4443),
      "Allows HTTPS Webserver access from Internet"
    );

    // --- CREATE KEY
    const key = new KeyPair(this, `${config.instanceName}-ec2key`, {
      name: `${config.instanceName}-ec2key`,
    });

    // Finally lets provision our ec2 instance
    const instance = new ec2.Instance(this, config.instanceName, {
      vpc: defaultVpc,
      role: role,
      securityGroup: securityGroup,
      instanceName: config.instanceName,
      instanceType: ec2.InstanceType.of(
        // t2.micro has free tier usage in aws
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ec2.MachineImage.latestAmazonLinux({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      keyName: key.keyPairName,
    });

    // 👇 load contents of initialization script
    const userDataScript = readFileSync(path.resolve(__dirname, "../initialize.sh"), "utf8");
    // 👇 add the User Data script to the Instance
    instance.addUserData(userDataScript);

    // cdk lets us output prperties of the resources we create after they are created
    // we want the ip address of this new instance so we can ssh into it later
    new cdk.CfnOutput(this, `${config.instanceName}-output`, {
      value: instance.instancePublicIp,
    });
  }
}
