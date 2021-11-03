# Welcome to the first CDK TypeScript demo!

This is a project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

### Getting started

To deploy and run this project is necessary create the `.env`, to do that we bring you `.env.example` that it helps as a template or guide to create and configure the environment variables

After that if it's possible the best way to deploy is use `GNU Make` to deploy, you only need to run

```bash
make deploy
```

If you can't use `GNU make`, you can check in `Makefile` file, the required command sequence for deploy this project.

To destroy the deployed infrastructure you only should run

```bash
make destroy # or its equivalent command
```
