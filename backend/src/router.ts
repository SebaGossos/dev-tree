import { Router } from "express";


import { createAccountHandler, getUser, logingHandler } from "./handlers";
import validate from "./middleware/validation";
import { loginValidations, registerValidations } from "./validations";

const router = Router();




// Autentication and registration routes
router.post('/auth/register', validate(registerValidations), createAccountHandler);
router.post('/auth/login', validate(loginValidations), logingHandler);
router.get('/user', getUser)

export default router;