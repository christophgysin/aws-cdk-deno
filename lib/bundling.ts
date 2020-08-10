import * as os from 'os';
import * as path from 'path';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';

const defaultBundlingImage = cdk.BundlingDockerImage.fromRegistry('hayd/alpine-deno');

/**
 * Options for bundling
 */
export interface BundlingOptions {
  /**
   * Entry path
   */
  readonly entry: string;
}

/**
 * Produce bundled Lambda asset code
 */
export function bundle(options: BundlingOptions): lambda.AssetCode {
  const input = path.join('/asset-input/index.ts')
  return lambda.Code.fromAsset(options.entry, {
    bundling: {
      image: defaultBundlingImage,
      // TODO: cache? --reload?
      command: ['bundle', input, '/asset-output/index.js'],
      volumes: [
        { containerPath: '/deno-dir', hostPath: path.join(os.homedir(), '.cache/deno') },
      ],
    },
  });
}

function chain(commands: string[]): string {
  return commands.filter(c => !!c).join(' && ');
}
