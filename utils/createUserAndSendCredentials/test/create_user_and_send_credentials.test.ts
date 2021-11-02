import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as CreateUserAndSendCredentials from '../lib/create_user_and_send_credentials-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CreateUserAndSendCredentials.CreateUserAndSendCredentialsStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
