import * as path from 'path';
import * as apigwv2 from '@aws-cdk/aws-apigatewayv2';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import DenoFunction from './lambda-deno';

export class AwsCdkDenoStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const denoLayer = new lambda.LayerVersion(this, 'DenoLayer', {
      code: lambda.Code.fromAsset(path.join(__dirname, '../src/layer')),
      compatibleRuntimes: [lambda.Runtime.PROVIDED],
    });

    const api = new apigwv2.HttpApi(this, 'HttpApi', {
      defaultIntegration: new apigwv2.LambdaProxyIntegration({
        handler:  new DenoFunction(this, 'deno', {
          entry: path.join(__dirname, '../src/lambda'),
          layers: [denoLayer],
        }),
      }),
    });

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url!,
    });
  }
}
