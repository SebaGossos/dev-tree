import { Router } from "express";

import validate from "./middleware/validation";
import { authenticate } from "./middleware/auth";
import { createAccountHandler, getUser, logingHandler, updateProfile, uploadImage } from "./handlers";
import { loginValidations, registerValidations, UpdateProfileValidations } from "./validations";

const router = Router();

// Autentication and registration routes
router.post("/auth/register", validate(registerValidations), createAccountHandler);
router.post("/auth/login", validate(loginValidations), logingHandler);

router.get("/user", authenticate, getUser);
router.patch("/user", validate(UpdateProfileValidations), authenticate, updateProfile);
router.post('/user/image', authenticate, uploadImage )

export default router;
