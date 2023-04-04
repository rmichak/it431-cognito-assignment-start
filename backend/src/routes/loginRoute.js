import { CognitoIdentityServiceProvider } from 'aws-sdk';
import crypto from 'crypto';

export const loginRoute = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;

        const secretHash = crypto.createHmac('sha256', process.env.COGNITO_CLIENT_SECRET).update(email + process.env.COGNITO_CLIENT_ID).digest('base64');

        const provider = new CognitoIdentityServiceProvider({ apiVersion: '2016-04-18', region: process.env.AWS_REGION });
        var params = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: process.env.COGNITO_CLIENT_ID,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
                SECRET_HASH: secretHash
            }
        }
        try {
            const data = await provider.initiateAuth(params).promise();
            let token = data.AuthenticationResult.AccessToken;
            //console.log(token);
            return res.status(200).json({ token });
        } catch (err) {
            if (err.code === 'NotAuthorizedException') {
                return res.status(401).json({ error: 'Incorrect username or password' });
            }
            console.log(err, err.stack); // an error occurred
            return res.sendStatus(500);
        }
    },
};