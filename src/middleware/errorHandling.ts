import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";

// Middleware que ejecuta validaciones y verifica errores
const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Ejecutar todas las validaciones
    for (let validation of validations) {
      const result = await validation.run(req);
    }

    // Verificar errores después de que todas las validaciones terminen
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    next();
  };
};
export default validate;