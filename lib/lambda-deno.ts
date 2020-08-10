import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { bundle } from './bundling';

/**
 * Properties for a DenoFunction
 */
export interface DenoFunctionProps extends lambda.FunctionOptions {
  /**
   * Path to the entry file (JavaScript or TypeScript).
   */
  readonly entry: string;

  /**
   * The name of the exported handler in the entry file.
   *
   * @default handler
   */
  readonly handler?: string;
}

export default class DenoFunction extends lambda.Function {
  constructor(scope: cdk.Construct, id: string, props: DenoFunctionProps) {

    // Entry and defaults
    const entry = props.entry;
    const handler = props.handler ?? 'handler';

    super(scope, id, {
      ...props,
      runtime: lambda.Runtime.PROVIDED,
      code: bundle({
        entry,
      }),
      handler: `index.${handler}`,
    });

    this.addEnvironment('HANDLER_EXT', 'js');
  }
}
