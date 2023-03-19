import { Router } from 'express';
import appRouter from './app.js';

const router = Router();

router.use('/app', appRouter);

export default router;