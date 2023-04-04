import { CognitoIdentityServiceProvider } from 'aws-sdk';
import crypto from 'crypto';


export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        const { email, password, name } = req.body;

        const secretHash = crypto.createHmac('sha256', process.env.COGNITO_CLIENT_SECRET).update(email + process.env.COGNITO_CLIENT_ID).digest('base64');

        const provider = new CognitoIdentityServiceProvider({ apiVersion: '2016-04-18', region: process.env.AWS_REGION });

        try {
            const data = await provider.signUp({
                ClientId: process.env.COGNITO_CLIENT_ID,
                Username: email,
                Password: password,
                SecretHash: secretHash,
                UserAttributes: [
                    {
                        Name: 'name',
                        Value: name
                    }
                ]


            }).promise();
            console.log(data);
            return res.sendStatus(201);

        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }



    },
};