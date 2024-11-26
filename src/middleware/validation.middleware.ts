import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

const validateDTO = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dtoInstance = plainToInstance(dtoClass, req.body);

      // Validate the DTO instance
      const errors = await validate(dtoInstance);

      if (errors.length > 0) {
        // Format the errors into a single string
        const formattedErrors = errors.map((error: ValidationError) =>
          Object.values(error.constraints || {})
        );

        // Throw a 400 Bad Request error with the formatted errors
        throw new createError.BadRequest(formattedErrors.flat().join(', '));
      }

      next();
      
    } catch (error) {
      next(error)
    }
  };
};

export default validateDTO;
