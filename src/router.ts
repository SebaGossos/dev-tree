import { Router } from "express";


import { createAccountHandler, logingHandler } from "./handlers";
import validate from "./middleware/validation";
import { loginValidations, registerValidations } from "./validations";

const router = Router();




// Autentication and registration routes
router.post('/auth/register', validate(registerValidations), createAccountHandler);
router.post('/auth/login', validate(loginValidations), logingHandler);

export default router;