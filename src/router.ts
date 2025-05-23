import { Router } from "express";

const router = Router();

// Autentication and registration routes
router.post('/auth/register', (req, res) => {
  const { body } = req;
  console.log(body);
  res.send('Register page');
})

export default router;