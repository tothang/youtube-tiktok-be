# Serverless application with Express

This is an app to get videos from Tiktok and Youtube by keyword

## Run de project

After install dependencies create a .env file and set up the proper variables(see .env-example)

run below command to authen with aws

``` export AWS_ACCESS_KEY_ID=AWS_ACCESS_KEY_ID ```

``` export AWS_SECRET_ACCESS_KEY=AWS_SECRET_ACCESS_KEY```

First we need to build our application using the following command: 

``` yarn build ```

Then use the following command to run serverless offline:

```yarn start:local```

Deploy

```yarn deploy-stage ```

```yarn deploy-production ```
