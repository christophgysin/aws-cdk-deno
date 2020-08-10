import * as path from 'path';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { bundle } from './bundling';

/**
 * Properties for a DenoFunction
 */
export interface DenoFunctionProps extends lambda.FunctionOptions {
  /**
   * Path to the entry directory (must contain index.ts).
   */
  readonly entry: string;

  /**
   * The name of the exported handler in the entry file.
   *
   * @default handler
   */
  readonly handler?: string;

  /**
   * A list of Lambda layers
   */
  readonly layers?: lambda.LayerVersion[];
}

export default class DenoFunction extends lambda.Function {
  constructor(scope: cdk.Construct, id: string, props: DenoFunctionProps) {

    // Entry and defaults
    const entry = props.entry;
    const handler = props.handler ?? 'handler';
    const layers = props.layers ?? [
      new lambda.LayerVersion(scope, 'DenoLayer', {
        code: lambda.Code.fromAsset(path.join(__dirname, '../src/layer')),
        compatibleRuntimes: [lambda.Runtime.PROVIDED],
      }),
    ];

    super(scope, id, {
      ...props,
      runtime: lambda.Runtime.PROVIDED,
      layers,
      code: bundle({
        ...props,
      }),
      handler: `index.${handler}`,
    });

    this.addEnvironment('HANDLER_EXT', 'js');
  }
}
