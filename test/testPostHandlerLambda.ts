import {handler as emiHandler} from '../functions/function'
import {Handler, Context, APIGatewayEvent, APIGatewayProxyResult} from 'aws-lambda'

const event: any = {
  httpMethod:'POST',
  body:JSON.stringify({
    name:'Rose'
  })
}

const callBack = (error:any, result:APIGatewayProxyResult) => {
  console.log('callback function')
  console.log(result.body)
}

const testLambda = async () => {
  console.log('testing lambda => POST')
  const result  = await emiHandler(event,{} as any, callBack)
  console.log(result)
}

testLambda();