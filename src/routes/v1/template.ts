import { Router } from 'express';
import multer from 'multer';

import * as TemplateController from '@controllers/template';
import * as TemplateValidations from '@validations/template';
import validate from '@middlewares/validation';

const router = Router();
const fileUploadMiddleware = multer({ dest: 'uploads/' });

router.get(
  '/:id',
  validate(TemplateValidations.retrieveTemplate),
  TemplateController.retrieveTemplate,
);
router.get(
  '/',
  validate(TemplateValidations.listTemplates),
  TemplateController.listTemplates,
);

router.post(
  '/',
  fileUploadMiddleware.single('file'),
  validate(TemplateValidations.createTemplate),
  TemplateController.createTemplate,
);

router.delete(
  '/:id',
  validate(TemplateValidations.deleteTemplate),
  TemplateController.deleteTemplate,
);

export default router;
