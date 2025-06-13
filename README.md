# Text Reverser API

A serverless AWS Lambda function built with TypeScript that provides an API to reverse text strings.

## Prerequisites

- Node.js (v18 or later)
- AWS Account and AWS CLI installed
- AWS CLI configured with credentials (`aws configure`)
- Serverless Framework (`npm install -g serverless`)
- TypeScript knowledge (basic)

## Project Structure

```
├── src/
│   ├── functions/
│   │   └── reverseText.ts     # Lambda function implementation
│   ├── utils/
│   │   └── stringUtils.ts     # Utility functions
│   └── index.ts              # Main entry point
├── tests/
│   └── reverseText.test.ts   # Test cases
├── serverless.yml           # Serverless configuration
├── tsconfig.json           # TypeScript configuration
├── package.json           # Project dependencies
└── README.md             # This file
```

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd text-reverser-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the TypeScript code:
   ```bash
   npm run build
   ```

4. Run tests to ensure everything is working:
   ```bash
   npm test
   ```

5. Deploy to AWS:
   ```bash
   npm run deploy
   ```

## API Usage

The API supports both GET and POST methods:

### GET Request
```bash
curl "https://[your-api-id].execute-api.[region].amazonaws.com/dev/reverse?text=Hello"
```

### POST Request
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello World"}' \
  https://[your-api-id].execute-api.[region].amazonaws.com/dev/reverse
```

### Response Format
```json
{
  "original": "Hello World",
  "reversed": "dlroW olleH"
}
```

## Direct Lambda Invocation

You can also invoke the Lambda function directly using AWS CLI:

```bash
# For POST requests
aws lambda invoke \
  --function-name text-reverser-api-dev-reverseText \
  --region us-east-1 \
  --payload '{"httpMethod": "POST", "body": "{\"text\":\"Hello\"}"}' \
  --cli-binary-format raw-in-base64-out output.json

# For GET requests
aws lambda invoke \
  --function-name text-reverser-api-dev-reverseText \
  --region us-east-1 \
  --payload '{"httpMethod": "GET", "queryStringParameters": {"text": "Hello"}}' \
  --cli-binary-format raw-in-base64-out output.json
```

## Local Development

1. Start the local server:
   ```bash
   npm run start
   ```

2. Test locally using curl:
   ```bash
   # GET request
   curl "http://localhost:3000/dev/reverse?text=Hello"

   # POST request
   curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"text":"Hello World"}' \
     http://localhost:3000/dev/reverse
   ```

## Scripts

- `npm run build` - Compiles TypeScript to JavaScript
- `npm test` - Runs test suite
- `npm run deploy` - Deploys to AWS
- `npm start` - Starts local development server

## Environment Variables

No environment variables are required for basic functionality.

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `400` - Bad Request (missing or invalid text parameter)
- `500` - Internal Server Error

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

Run the test suite with:
```bash
npm test
```

The tests use Jest and test both the main Lambda function and utility functions.

## Deployment

The project uses the Serverless Framework for deployment. The `serverless.yml` file contains all the AWS infrastructure configuration.

To deploy:
```bash
npm run deploy
```

To remove the deployment:
```bash
serverless remove
```

## License

This project is licensed under the MIT License - see the LICENSE file for details
