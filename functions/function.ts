import { Handler, Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import {DynamoDBClient, GetItemCommand, PutItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb';

const dynamoClient = new DynamoDBClient({})
let TABLE_NAME = process.env.HELLO_TABLE_NAME;
const enum HTTP_METHOD {
  GET='GET',
  POST='POST'
}

export const handler: Handler =async (event:APIGatewayEvent, context:Context): Promise<APIGatewayProxyResult> => {
  
   const method = event.httpMethod
   console.log(method)
   let message:string;
   var result;
   switch(method){

     case HTTP_METHOD.GET:

       if(event.queryStringParameters){
        result = await findByName(event.queryStringParameters['name']!)
        message = JSON.stringify(unmarshall(result.Item!))
       } else {
        result = await scanAll();
        message = JSON.stringify(result.Items)
       }

       console.log(result);
       break;

      case HTTP_METHOD.POST:
        result = await saveName(event)
        console.log(result);
        message=JSON.stringify(result)
        break;

      default:
        message=JSON.stringify('ANY')
        break;
   }

   console.log('message', message)

   return {
     statusCode:200,
     body:message
   }
}

const saveName = async (event:APIGatewayEvent) => {

  if(!event.body){
    console.log('body missing for save Item');
    return
  }
   
  if(!TABLE_NAME)
  {
    console.log('missing table name');
    TABLE_NAME = 'hello'
  }

  const body = JSON.parse(event.body)
  
  const params = {
    TableName:TABLE_NAME,
    Item: {
      name: {S: body.name}
    }
  }

  return await dynamoClient.send(new PutItemCommand(params))
}

const scanAll = async () =>{

  if(!TABLE_NAME){
    TABLE_NAME = 'hello'
  }
  const params = {
    TableName:TABLE_NAME
  }

  return await dynamoClient.send(new ScanCommand(params));
}


const findByName = async (name:string) =>{

  if(!TABLE_NAME){
    TABLE_NAME = 'hello'
  }

  const params = {
    TableName:TABLE_NAME,
    Key:{
      name: {S: name}
    }
  }

  return await dynamoClient.send(new GetItemCommand(params));
}
