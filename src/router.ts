import { Router } from "express";
import { body } from 'express-validator';

import { createAccountHandler } from "./handlers";

const router = Router();

// Autentication and registration routes
router.post('/auth/register',
  // Validation middleware for registration
  body('handle')
    .notEmpty()
    .withMessage('handle field is required'),
  body('name')
    .notEmpty()
    .withMessage('Name field is required'),
  body('password')
    .isLength({min: 8})
    .withMessage('Password field is required and must be at least 8 characters long'),
  body('email')
    .isEmail()
    .withMessage('Email field is required'),
  createAccountHandler
)

export default router;