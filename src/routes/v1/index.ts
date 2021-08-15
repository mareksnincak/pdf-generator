import { Router } from 'express';

import documentRouter from './document';
import templateRouter from './template';
import userRouter from './user';

const router = Router();

router.use('/documents', documentRouter);
router.use('/templates', templateRouter);
router.use('/users', userRouter);

export default router;
