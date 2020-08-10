# CDK example for deno

Provides:
- layer with deno runtime
- lambda-deno bundler
- example function

## Setup

  $ wget https://github.com/hayd/deno-lambda/releases/download/1.2.2/deno-lambda-layer.zip
  $ mkdir src/layer
  $ cd src/layer
  $ unzip ../../deno-lambda-layer.zip

## TODO
- move layer to lambda-deno using similar approach as SingletonLambda
- aws-sdk for deno
