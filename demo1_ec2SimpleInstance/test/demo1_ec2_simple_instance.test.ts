import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Demo1Ec2SimpleInstance from '../lib/demo1_ec2_simple_instance-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Demo1Ec2SimpleInstance.Demo1Ec2SimpleInstanceStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
