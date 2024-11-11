import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

const validateDTO = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dtoInstance = plainToInstance(dtoClass, req.body);

    // Validate the DTO instance
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const formattedErrors = errors.map((error: ValidationError) => Object.values(error.constraints || {}));
      res.status(400).json({ errors: formattedErrors.flat() });
      return;
    }

    next();
  };
};

export default validateDTO;
