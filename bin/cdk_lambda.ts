#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LambdaStack } from '../stacks/LambdaStack';
import { ApiStack } from '../stacks/ApiStack';

const app = new cdk.App();
const emicdklamnda = new LambdaStack(app, 'LambdaStack-CDK-Test');
new ApiStack(app, 'emiApiCdkStack', {
  emilamdaIntegration: emicdklamnda.emiLambdaCDkIntegration
})