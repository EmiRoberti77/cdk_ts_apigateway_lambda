import { Handler, Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'

export const handler: Handler =async (event:APIGatewayEvent, context:Context): Promise<APIGatewayProxyResult> => {
  
   const method = event.httpMethod
   console.log(method)
   let message:string;

   switch(method){
     case 'GET':
       message = 'GET'
       break;
      case 'POST':
        message = 'POST'
        break;
      default:
        message='ANY'
        break;
   }

   console.log('message', message)

   return {
     statusCode:200,
     body:JSON.stringify(`http method was ${message}`)
   }
}
