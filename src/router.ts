import { Router } from "express";

const router = Router();

// Autentication and registration routes
router.get('/auth/register', (req, res) => {
  res.send('Register page');
})

export default router;