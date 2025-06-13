import { handler } from '../src/functions/reverseText';
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('reverseText Lambda function', () => {
  it('should reverse the input text', async () => {
    const event = {
      body: JSON.stringify({ text: 'Hello World' })
    } as APIGatewayProxyEvent;

    const result = await handler(event);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(200);
    expect(body.original).toBe('Hello World');
    expect(body.reversed).toBe('dlroW olleH');
  });

  it('should handle empty request body', async () => {
    const event = {} as APIGatewayProxyEvent;

    const result = await handler(event);
    expect(result.statusCode).toBe(400);
  });

  it('should handle missing text parameter', async () => {
    const event = {
      body: JSON.stringify({})
    } as APIGatewayProxyEvent;

    const result = await handler(event);
    expect(result.statusCode).toBe(400);
  });
});
