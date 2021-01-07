import 'reflect-metadata'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import { createConnection } from 'typeorm'

import userRoutes from './routes/User'
import rolesRoutes from './routes/Roles'
import authRoutes from './routes/Auth'
import initiativeRoutes from './routes/Initiative'

const parentDir = require('path').resolve(process.cwd(), '../');
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
        app.use(rolesRoutes);
        app.use(authRoutes);
        app.use(initiativeRoutes);
        app.get('/', (req, res) => {
            res.sendFile(parentDir + "/one-cgiar-front/dist/login/index.html")
        });

        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(error => console.log(error));