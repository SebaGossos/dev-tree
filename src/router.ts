import { Router } from "express";
import { createAccountHandler } from "./handlers";

const router = Router();

// Autentication and registration routes
router.post('/auth/register', createAccountHandler)

export default router;