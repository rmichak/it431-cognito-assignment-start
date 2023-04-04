import { CognitoJwtVerifier } from "aws-jwt-verify";

export const getTestRoute = {
    path: '/api/test',
    method: 'get',
    handler: async (req, res) => {

        const { authorization } = req.headers;

        //verify header was sent
        if (!authorization || authorization === "Bearer null") {
            console.log("header missing");
            return res.status(401).json({ message: "No authorization header sent." });

        }

        // Verifier that expects valid access tokens:
        const verifier = CognitoJwtVerifier.create({
            userPoolId: process.env.COGNITO_USER_POOL_ID,
            tokenUse: "access",
            clientId: process.env.COGNITO_CLIENT_ID,
        });

        try {
            const payload = await verifier.verify(
                authorization.split(" ")[1] // the JWT as string

            );

            console.log(payload)

        }
        catch (err) {
            if (err.message.includes("Token expired")) {
                return res.status(401).json({ result: "Token Expired" });
            } else {
                console.log(err);
                return res.status(500).json({ result: "Token Validation Error" });

            }
        }

        return res.status(200).json({ message: "success" });


    },
};