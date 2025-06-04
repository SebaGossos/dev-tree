import { Router } from "express";

import validate from "./middleware/validation";
import { authenticate } from "./middleware/auth";
import { createAccountHandler, getUser, logingHandler } from "./handlers";
import { loginValidations, registerValidations } from "./validations";

const router = Router();

// Autentication and registration routes
router.post("/auth/register", validate(registerValidations), createAccountHandler);
router.post("/auth/login", validate(loginValidations), logingHandler);
router.get("/user", authenticate, getUser);

export default router;
