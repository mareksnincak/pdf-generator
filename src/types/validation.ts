import {
  ArraySchema,
  BooleanSchema,
  DateSchema,
  NumberSchema,
  ObjectSchema,
  StringSchema,
} from 'yup';

export type TValueSchema =
  | BooleanSchema
  | StringSchema
  | NumberSchema
  | DateSchema
  | ObjectSchema<any>
  | ArraySchema<any>;

export type TValidationKey =
  | 'body'
  | 'cookies'
  | 'headers'
  | 'params'
  | 'query';

export type TValidationValue = Record<string, TValueSchema>;

export type TValidationData = Partial<Record<TValidationKey, TValidationValue>>;

/**
 * @member transform - override request values by yup.transform values
 */
export type TValidationOptions = {
  transform?: boolean;
};
