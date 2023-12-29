"use strict";

import express from 'express';
import userRouter from './src/modules/users/user.routes.js';
import postRouter from './src/modules/posts/post.routes.js';
import { dbConnection } from './database/dbConnection.js';

const app = express();
const port = 3000;

dbConnection();

app.use(express.json());

app.use('/api/v1', userRouter);
app.use('/api/v1', postRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));