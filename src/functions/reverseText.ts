import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { reverseString } from '../utils/stringUtils';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    let text: string | undefined;
    
    if (event.httpMethod === 'GET') {
      text = event.queryStringParameters?.text;
    } else if (event.httpMethod === 'POST' && event.body) {
      const parsed = JSON.parse(event.body);
      text = parsed.text;
    }

    if (!text) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: event.httpMethod === 'GET' 
            ? 'text parameter is required in query string' 
            : 'Request body is required with text field'
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };
    }

    const reversedText = reverseString(text);

    return {
      statusCode: 200,
      body: JSON.stringify({
        original: text,
        reversed: reversedText
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal server error'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  }
};
