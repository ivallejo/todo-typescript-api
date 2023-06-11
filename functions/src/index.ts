import * as express from 'express';
import { onRequest } from "firebase-functions/v2/https";
import { useRoutes } from './routes';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

useRoutes(app)

app.get('/status', (req, res) => res.status(200).json({ message: 'Is Alive!' }))

exports.app = onRequest(app)

export {
  app
}
