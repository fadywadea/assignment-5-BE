"use strict";

import express from 'express';
import { mongooseConnection } from './database/dbConnection.js';
import userRouter from './src/modules/users/user.routes.js';
import postRouter from './src/modules/posts/post.routes.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/v1', userRouter);
app.use('/api/v1', postRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));