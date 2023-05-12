import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs'
import { Runtime } from "aws-cdk-lib/aws-lambda";
import path = require("path");
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";

export class LambdaStack extends Stack{

  public emiLambdaCDkIntegration: LambdaIntegration

  constructor(scope:Construct, id:string, props?:StackProps){
    super(scope, id, props);
   
    const lambdaFuntion = new NodejsFunction(this, 'emiCDKLambdaFunction', {
      functionName:'emiCDKLambdaFunction',
      runtime: Runtime.NODEJS_18_X,
      entry:path.join(__dirname, '..', 'functions', 'function.ts'),
      handler:'handler'
    })

    this.emiLambdaCDkIntegration = new LambdaIntegration(lambdaFuntion);
  }
}