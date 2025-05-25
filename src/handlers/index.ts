import User from "../models/User"

export const createAccountHandler = async (req, res) => {
  const user = new User(req.body)
  await user.save()
  

  res.send('REgistro creado correctamente')
}