import * as yup from 'yup';

const validationSchema = {
  NODE_ENV: yup
    .string()
    .oneOf(['production', 'development'])
    .default('production'),
  PUPPETEER_NUMBER_OF_INSTANCES: yup.number().default(4),
  PUPPETEER_TIMEOUT_MS: yup.number().default(10000),
  TYPEORM_CONNECTION: yup.string().required(),
  TYPEORM_HOST: yup.string().required(),
  TYPEORM_USERNAME: yup.string().required(),
  TYPEORM_PASSWORD: yup.string().required(),
  TYPEORM_DATABASE: yup.string().required(),
  TYPEORM_PORT: yup.number().required(),
  TYPEORM_SYNCHRONIZE: yup.boolean(),
  TYPEORM_LOGGING: yup.boolean(),
  TYPEORM_ENTITIES: yup.string().required(),
  SERVER_PORT: yup.number().default(3000),
};

let transformedData;
try {
  transformedData = yup
    .object()
    .shape(validationSchema)
    .validateSync(process.env, {
      abortEarly: false,
      stripUnknown: true,
    });
} catch (error) {
  throw new Error(
    `Config validation failed: ${JSON.stringify(error.errors, null, 4)}`,
  );
}

/**
 * Yup already casts values to specified type
 * Therefore we just add correct TS assertions and don't recast values
 */
const exposedConfig = {
  env: transformedData.NODE_ENV as string,
  puppeteer: {
    numberOfInstances: transformedData.PUPPETEER_NUMBER_OF_INSTANCES as number,
    timeoutMs: transformedData.PUPPETEER_TIMEOUT_MS as number,
  },
  typeorm: {
    connection: transformedData.TYPEORM_CONNECTION as string,
    host: transformedData.TYPEORM_HOST as string,
    username: transformedData.TYPEORM_USERNAME as string,
    password: transformedData.TYPEORM_PASSWORD as string,
    database: transformedData.TYPEORM_DATABASE as string,
    port: transformedData.TYPEORM_PORT as number,
  },
  server: {
    port: transformedData.SERVER_PORT as number,
  },
} as const;

export default exposedConfig;
