# Alexa Template

This project is an Alexa Skill written in JavaScript (ES7). It is intended to be deployed to AWS Lambda, but can also be run via Express server. Deployment and infrastructure is managed by [Serverless](https://serverless.com).

## Setup

* [Create](https://developer.amazon.com/edw/home.html#/skills) a new Alexa Skill. Note the Application Id.

* Launch the Skill Builder. Paste the contents of `interaction-model.json` into the Code Editor. Save and build the model.

* Configure AWS CLI

 ```bash
 aws configure --profile [your-profile-name]
 AWS Access Key ID [None]: [YOUR_ACCESS_KEY]
 AWS Secret Access Key [None]: [YOUR_SECRET_ACCESS_KEY]
 Default region name [None]: us-west-1
 Default output format [None]: json
 ```

* Install Node Modules

 ```bash
 npm i
 ```

* Load environemnt specific credentials
  * Create a `env.yaml` file like below and place it in the root directory of the application
  * Add your `alexa_app_id` key to the env file
```yaml
  test:
    alexa_app_id: foo
    NODE_ENV: test

  local:
    NODE_ENV: local
    alexa_app_id: abc123

  staging:
    NODE_ENV: staging
    alexa_app_id: abc124

  production:
    NODE_ENV: production
    alexa_app_id: abc125
```
## Deployment
To deploy all functions & serverless changes
 ```bash
 sls deploy --stage {environment}
 ```

To deploy a single function
 ```bash
 sls deploy function -f function-name --stage {environment}
 ```

If deploying to a new environemnt for the first time, after the deploy login to the AWS Lambda page for your functino, and copy the ARN. In your Alexa configuration for the specific instance you deployed, update the Service Endpoint Type to AWS Lambda ARN and Paste the AWS Lambda ARN

## Run/Debug

This project uses uses [babel-node](https://babeljs.io/docs/usage/cli/#babel-node) with Express to run/debug the skill locally. ESLint is setup for linting.

| Command               | Description                                         |
|-----------------------|-----------------------------------------------------|
| npm start             | Start Express server.                               |
| npm run start:inspect | Start Express server with inspector agent enabled.  |
| npm run lint          | Run ESLint                                          |
| npm run lint:fix      | Run ESLint and automatically fix problems.          |
| npm run test          | Run All tests in ./test directory.                  |
| npm run test:inspect  | Run All tests in ./test directory with inspector.   |


**Note** if chrome inspector does not launch with `debugger;` you may need to do the following:
```
In Chrome 60+ there is an item "Open dedicated DevTools for Node" in chrome://inspect/#devices url, (as well as node.js icon in devtools while node is running) The opened inspect window will connect to node.js as soon as it starts or restarts, so there is no need to open it manually each time.
```

### Running Locally
  ~Sometimes~ Often you need to run locally to debug and test. You can test alexa on your local machine by running this server with node and pointing your alexa skill to it.
   - In the root directory run `npm run start` which will start the server on port 3000
   - In another shell use ngrok to create a tunnel to your machine [ngrok](https://ngrok.com/)
     - Type `ngrok http 3000` and copy the `https` url it gives you
     - In your skill settings on the alexa dashboard, change your endpoint to `https` and paste the `https` url
     - Make sure to select `My development endpoint is a sub-domain of a domain that has a wildcard cerficiate`
  - Now you can click the `Test` tab in your alexa dashboard to invoke your skill and it should now route to your localserver

### Sentry
  I'm using Sentrys wrapper for catching and reporting errors in lambda. You can create a free Sentry account at http://sentry.io/ and add the DSN url in the serverless.yml `custom` section - If you choose not to use Sentry, everything will still work
