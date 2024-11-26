import { errorResponse } from '@utils/responseTemplates';
import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  errorResponse(res,statusCode, message);
};

export default errorHandler;
