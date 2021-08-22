import httpStatus from 'http-status';

export const isHttpError = (statusCode: number) => {
  return statusCode >= httpStatus.BAD_REQUEST;
};

export const isClientHttpError = (statusCode: number) => {
  return (
    statusCode >= httpStatus.BAD_REQUEST &&
    statusCode < httpStatus.INTERNAL_SERVER_ERROR
  );
};

export const isServerHttpError = (statusCode: number) => {
  return statusCode >= httpStatus.INTERNAL_SERVER_ERROR;
};
