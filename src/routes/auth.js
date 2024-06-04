import express from 'express';
import { loginUser } from "../controllers/auth.js";

const router = express.Router();

router.post('/login', async (req, res) => {
    const { tokenId } = req.body;
    try {
      const { accessToken } = await loginUser(tokenId);
      res.status(200).json({ message: 'Login successful', accessToken});
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Login failed' });
    }
  });
  export default router;