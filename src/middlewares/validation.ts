import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

import {
  TValidationData,
  TValidationKey,
  TValidationOptions,
} from "@ctypes/validation";

const validationKeys: TValidationKey[] = [
  "body",
  "cookies",
  "headers",
  "params",
  "query",
];

const createValidationSchema = (validationData: TValidationData) => {
  const schemaData = {};
  for (const validationKey of validationKeys) {
    const validationSchemaValue = validationData[validationKey];

    if (!validationSchemaValue) {
      continue;
    }

    schemaData[validationKey] = yup.object().shape(validationSchemaValue);
  }

  return yup.object().shape(schemaData);
};

const validate = (
  validationData: TValidationData,
  options: TValidationOptions = {}
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
    } catch (error) {
      return next(new Error(`Validation failed ${error.errors}`));
    }

    return next();
  };
};

export default validate;
