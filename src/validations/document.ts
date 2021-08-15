import { TValidationData } from '@ctypes/validation';
import * as yup from 'yup';

export const generateDocument: TValidationData = {
  body: {
    templateId: yup.string().uuid().required(),
    data: yup
      .object()
      .default({})
      .typeError('body.data must be a valid object'),
  },
};
