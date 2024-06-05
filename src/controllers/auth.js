import { OAuth2Client } from'google-auth-library';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const client=new OAuth2Client();
const clientID = process.env.CLIENT_ID;
const jwtSecret= process.env.JWT_SECRET;

const loginUser =async(tokenId)=>{
    const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: clientID
    });
    const payload = ticket.getPayload();
    //extract user data
    const userID = payload['sub'];
    const name= payload['name'];
    const email= payload['email'];
    const pic= payload['picture'];

    if (!userID) {
        return res.status(401).json({ message: 'Invalid Sign in' });
    }
  
    // JWT generation
    const accessToken = jwt.sign({ userID,name,email,pic }, jwtSecret, { expiresIn: '1d' }); 
    return { accessToken }
}

export { loginUser};
