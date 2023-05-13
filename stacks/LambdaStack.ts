import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs'
import { FunctionUrlAuthType, Runtime } from "aws-cdk-lib/aws-lambda";
import path = require("path");
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import {Table, AttributeType} from 'aws-cdk-lib/aws-dynamodb'
import { table } from "console";

export class LambdaStack extends Stack{

  public emiLambdaCDkIntegration: LambdaIntegration

  constructor(scope:Construct, id:string, props?:StackProps){
    super(scope, id, props);

    const table = new Table(this, 'hello', {
      partitionKey:{
        name: 'name', 
        type: AttributeType.STRING
      },
      tableName:'hello'
    });
   
    const lambdaFuntion = new NodejsFunction(this, 'emiCDKLambdaFunction', {
      functionName:'emiCDKLambdaFunction',
      runtime: Runtime.NODEJS_18_X,
      entry:path.join(__dirname, '..', 'functions', 'function.ts'),
      handler:'handler',
      environment:{
        HELLO_TABLE_NAME:table.tableName
      }
    })

    //add rights to the dynamo table for the lambda
    table.grantReadWriteData(lambdaFuntion);

    //set Auth to none and cors to any
    const myFuncUrl = lambdaFuntion.addFunctionUrl({
      authType:FunctionUrlAuthType.NONE,
      cors:{
        allowedOrigins:['*']
      }
    })

    //keep reference of the LambdIntegration to pass the the 
    //API stack to associate API Gateway to this lambda
    this.emiLambdaCDkIntegration = new LambdaIntegration(lambdaFuntion);
  }
}