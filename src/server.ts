import express from 'express';
import cors from 'cors';

import routes from './routes';

import 'dotenv/config';
import './database/mongodb';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
	console.log('🤑 Server running at PORT: 3333');
});
