import { CognitoIdentityServiceProvider } from 'aws-sdk';
import crypto from 'crypto';


export const forgotPasswordRoute = {
    path: '/api/forgot-password',
    method: 'post',
    handler: async (req, res) => {
        const { email } = req.body;

        const secretHash = crypto.createHmac('sha256', process.env.COGNITO_CLIENT_SECRET).update(email + process.env.COGNITO_CLIENT_ID).digest('base64');

        const provider = new CognitoIdentityServiceProvider({ apiVersion: '2016-04-18', region: process.env.AWS_REGION });
        provider.forgotPassword({
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: email,
            SecretHash: secretHash
        }, function (err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
                return res.sendStatus(500);

            }
            else {
                console.log(data);           // successful response
                return res.sendStatus(200);
            }
        }
        );

    },
};