import Joi from "joi";

const validationSchema = {
  NODE_ENV: Joi.string()
    .valid("production", "development")
    .default("production"),
  TYPEORM_CONNECTION: Joi.string().required(),
  TYPEORM_HOST: Joi.string().required(),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string().required(),
  TYPEORM_DATABASE: Joi.string().required(),
  TYPEORM_PORT: Joi.number().required(),
  TYPEORM_SYNCHRONIZE: Joi.boolean().required(),
  TYPEORM_LOGGING: Joi.boolean().required(),
  TYPEORM_ENTITIES: Joi.string().required(),
  SERVER_PORT: Joi.number().default(3000),
};

const { value: parsedValues, error } = Joi.object(validationSchema).validate(
  process.env,
  { abortEarly: false, stripUnknown: true }
);

if (error) {
  throw new Error(`Config validation error: ${error.annotate()}`);
}

/**
 * Joi already casts values to specified type
 * Therefore we just add correct TS assertions and don't recast values
 */
const exposedConfig = Object.freeze({
  env: parsedValues.NODE_ENV as string,
  typeorm: {
    connection: parsedValues.TYPEORM_CONNECTION as string,
    host: parsedValues.TYPEORM_HOST as string,
    username: parsedValues.TYPEORM_USERNAME as string,
    password: parsedValues.TYPEORM_PASSWORD as string,
    database: parsedValues.TYPEORM_DATABASE as string,
    port: parsedValues.TYPEORM_PORT as number,
  },
  server: {
    port: parsedValues.SERVER_PORT as number,
  },
});

export default exposedConfig;
