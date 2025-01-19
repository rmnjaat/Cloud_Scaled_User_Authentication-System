const jwt = require('jsonwebtoken');

const ensureAuth = (req, res , next) => {
    const auth = req.headers['authorization'];
   

    if (!auth) {
        return res.status(403).json({ message: "JWT token  is required" });
    }

    try {
        
        const decodedData =  jwt.verify(auth, process.env.JWT_SECRET);
       
        
        req.user = decodedData;
        next();

    }catch (error) {
        return res.status(403).json({ message:"JWT token wrong or expired" });
    }
}


module.exports = ensureAuth;