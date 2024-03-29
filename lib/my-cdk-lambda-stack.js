const { Stack, CfnOutput  } = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');
const path = require('path');

class MyCdkLambdaStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const myFn = new lambda.Function(this, 'MyFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'app.lambdaHandler',
      functionName: 'my-cdk-lambda-function-rank',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
    });
    
    const fnUrl = myFn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });
    
    new CfnOutput(this, 'TheUrl', {
      value: fnUrl.url,
      exportName: 'URL'
    });

  }
}

module.exports = { MyCdkLambdaStack }
