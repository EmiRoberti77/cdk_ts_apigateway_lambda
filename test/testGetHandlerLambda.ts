import {handler as emiHandler} from '../functions/function'
import {Handler, Context, APIGatewayEvent, APIGatewayProxyResult} from 'aws-lambda'

const callBack = (error:any, result:APIGatewayProxyResult) => {
  console.log('callback function')
  console.log(result.body)
}

const testLambda = async (name:string) => {

  console.log('name', name)

  const event: any = {
      httpMethod:'GET',
      queryStringParameters:{
        name
      }
  }

  console.log('testing lambda => GET')
  const result  = await emiHandler(event,{} as any, callBack)
  console.log(result)

}

testLambda(process.argv[2]);