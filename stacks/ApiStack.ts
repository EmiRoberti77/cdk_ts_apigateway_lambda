import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
  emilamdaIntegration:LambdaIntegration;
}

export class ApiStack extends Stack {
  constructor(scope:Construct, id:string, props:ApiStackProps){
    super(scope, id, props);

    //create API stack
    const api = new RestApi(this, 'emicdkapi');

    //create API root endpoint
    const emiapiResources = api.root.addResource('api');

    //add method http: get / post / put / delete
    emiapiResources.addMethod('GET', props.emilamdaIntegration);
    emiapiResources.addMethod('POST', props.emilamdaIntegration);
  }
}