import { TValidationData } from '@ctypes/validation';
import * as yup from 'yup';

export const getUser: TValidationData = {
  params: {
    id: yup.string().uuid().required(),
  },
};
