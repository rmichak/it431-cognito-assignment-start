import { CognitoIdentityServiceProvider } from 'aws-sdk';
import crypto from 'crypto';


export const signUpVerifyRoute = {
    path: '/api/signup-verify',
    method: 'post',
    handler: async (req, res) => {
        const { email, code } = req.body;

        const secretHash = crypto.createHmac('sha256', process.env.COGNITO_CLIENT_SECRET).update(email + process.env.COGNITO_CLIENT_ID).digest('base64');

        const provider = new CognitoIdentityServiceProvider({ apiVersion: '2016-04-18', region: process.env.AWS_REGION });
        var params = {
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: email,
            ConfirmationCode: code,
            SecretHash: secretHash
        }

        try {
            const data = await provider.confirmSignUp(params).promise();
            console.log(data);
            return res.sendStatus(200);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }

    },
};