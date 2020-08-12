import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'https://deno.land/x/lambda/mod.ts'

export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  console.log('event:', JSON.stringify(event, null, 2))
  console.log('context:', JSON.stringify(context, null, 2))

  return {
    statusCode: 200,
    headers: {
      'content-type': 'text/html;charset=utf8',
    },
    body: `Welcome to deno ${Deno.version.deno} 🦕`,
  }
}
