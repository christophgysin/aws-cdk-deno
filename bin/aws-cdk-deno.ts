#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsCdkDenoStack } from '../lib/aws-cdk-deno-stack';

const app = new cdk.App();
new AwsCdkDenoStack(app, 'AwsCdkDenoStack');
