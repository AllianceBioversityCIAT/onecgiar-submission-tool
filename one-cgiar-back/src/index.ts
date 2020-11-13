import 'reflect-metadata'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import { createConnection } from 'typeorm'

import userRoutes from './routes/User'
import authRoutes from './routes/Auth'

const PORT = process.env.PORT || 3000;

createConnection()
    .then(async () => {
        const app = express();

        // middlewares
        app.use(cors());
        app.use(morgan('dev'));
        app.use(helmet());
        app.use(express.json());

        // routes
        app.use(userRoutes);
        app.use(authRoutes);

        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(error => console.log(error));