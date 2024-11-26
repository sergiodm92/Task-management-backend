export function successResponse(res: any, message: string, data: any = null, statusCode: number = 200) {
  res.status(statusCode).json({
    status: "success",
    statusCode,
    message,
    data,
  });
}

export function errorResponse(res: any, statusCode: number = 400, message: string) {
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  });
}