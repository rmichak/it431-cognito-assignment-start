import express from 'express';
import { routes } from './routes';
import cors from 'cors';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(express.json());

// Add all the routes to our Express server
// exported from routes/index.js
routes.forEach(route => {
    app[route.method](route.path, route.handler);
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
