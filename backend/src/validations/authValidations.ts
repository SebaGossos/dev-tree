import { body } from "express-validator";

// Validaciones para registro
export const registerValidations = [
  body("handle").notEmpty().withMessage("handle field is required"),
  body("name").notEmpty().withMessage("Name field is required"),
  body("password").isLength({ min: 8 }).withMessage("Password field is required and must be at least 8 characters long"),
  body("email").isEmail().withMessage("Email field is required"),
];

// Validaciones para login
export const loginValidations = [
  body("password").notEmpty().withMessage("Password field is required"), 
  body("email").isEmail().withMessage("Email field is required")
];

// Validaciones para Update profile
export const UpdateProfileValidations = [
  body("handle").notEmpty().withMessage("handle field is required"),
  body("description").notEmpty().withMessage("Description field is required"),
];
