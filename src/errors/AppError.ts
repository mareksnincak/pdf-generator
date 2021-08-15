type TAppErrorParams = {
  message?: string;
  statusCode: number;
  detail?: any;
};

class AppError extends Error {
  statusCode: number;
  detail?: any;

  constructor({ message, statusCode, detail }: TAppErrorParams) {
    super(message);

    this.statusCode = statusCode;
    if (detail) {
      this.detail = detail;
    }

    Object.setPrototypeOf(this, AppError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}

export default AppError;
