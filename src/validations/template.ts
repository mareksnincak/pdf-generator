import { ALLOWED_TEMPLATE_TYPES } from '@constants/template';
import { TValidationData } from '@ctypes/validation';
import * as yup from 'yup';

export const retrieveTemplate: TValidationData = {
  params: {
    id: yup.string().uuid().required(),
  },
};

export const listTemplates: TValidationData = {
  query: {
    type: yup.string().oneOf(ALLOWED_TEMPLATE_TYPES),
  },
};

export const createTemplate: TValidationData = {
  body: {
    type: yup.string().oneOf(ALLOWED_TEMPLATE_TYPES).required(),
  },
  file: {
    path: yup.string().required('body.file is a required field'),
  },
};

export const deleteTemplate: TValidationData = {
  params: {
    id: yup.string().uuid().required(),
  },
};
