import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

import {
  TValidationData,
  TValidationKey,
  TValidationOptions,
  TValidationSchema,
} from '@ctypes/validation';
import AppError from '@errors/AppError';
import httpStatus from 'http-status';

const validationKeys: TValidationKey[] = [
  'body',
  'cookies',
  'headers',
  'params',
  'query',
  'file',
  'files',
];

const createValidationSchema = (validationData: TValidationData) => {
  const schemaData: TValidationSchema = {};
  for (const validationKey of validationKeys) {
    const validationSchemaValue = validationData[validationKey];

    if (!validationSchemaValue) {
      continue;
    }

    if (validationSchemaValue instanceof yup.ObjectSchema) {
      schemaData[validationKey] = validationSchemaValue;
    } else {
      schemaData[validationKey] = yup.object().shape(validationSchemaValue);
    }
  }

  return yup.object().shape(schemaData);
};

const validate = (
  validationData: TValidationData,
  options: TValidationOptions = {},
) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const validationSchema = createValidationSchema(validationData);

    try {
      const transformedData = await validationSchema.validate(req, {
        abortEarly: false,
      });

      /**
       * Replace request values by yup.transform values
       */
      if (options.transform) {
        for (const validationKey of validationKeys) {
          const transformedValue = transformedData[validationKey];

          if (!transformedValue) {
            continue;
          }

          req[validationKey as TValidationKey] = transformedValue;
        }
      }
    } catch (err) {
      if (err instanceof yup.ValidationError)
        return next(
          new AppError({
            message: 'Validation error',
            statusCode: httpStatus.UNPROCESSABLE_ENTITY,
            detail: { errors: err.errors },
          }),
        );

      return next(err);
    }

    return next();
  };
};

export default validate;
