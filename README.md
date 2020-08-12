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

## Invoke locally

    $ docker run -e DOCKER_LAMBDA_STAY_OPEN=1 -p 9001:9001 -it --rm -v $PWD:/var/task:ro,delegated -v $PWD/src/layer:/opt:ro,delegated lambci/lambda:provided src/lambda/index.handler
    $ aws lambda invoke --endpoint http://localhost:9001 --no-sign-request --function-name deno-func --payload '{}' output.json

## TODO
- Create Lambda Layer as Singleton
- aws-sdk for deno
