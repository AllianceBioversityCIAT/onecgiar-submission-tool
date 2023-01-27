import {Router} from 'express';
console.log;
import auth from './AuthRoutes';
import user from './UserRoutes';
import roles from './RolesRoutes';
import initiatives from './InitiativesRoutes';
import stagesControl from './StagesControl';
import metaData from './MetaDataRoutes';
import previews from './PreviewsRoutes';
import toc from './TocRoutes';

const Routes = Router();
Routes.use('/auth', auth);
Routes.use('/users', user);
Routes.use('/roles', roles);
Routes.use('/initiatives', initiatives);
Routes.use('/stages-control', stagesControl);
Routes.use('/meta', metaData);
Routes.use('/previews', previews);
Routes.use('/toc', toc);

export default Routes;
