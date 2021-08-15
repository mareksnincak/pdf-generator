import { Router } from 'express';

import * as DocumentController from '@controllers/document';
import * as DocumentValidations from '@validations/document';
import validate from '@middlewares/validation';

const router = Router();

router.post(
  '/generate',
  validate(DocumentValidations.generateDocument),
  DocumentController.generateDocument,
);

export default router;
