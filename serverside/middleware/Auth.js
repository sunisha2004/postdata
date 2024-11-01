import pkg from 'jsonwebtoken';
const {verify}=pkg;

export default async function Auth(req,res,next) {

    try{
        const key=req.headers.authorization
        if(!key)
            return res.status(403).send("unauthorised access")
        const token=key.split(" ")[1]
        console.log(token);
        const auth=await verify(token,process.env.JWT_KEY)
        console.log(auth);
        req.user=(auth)
        next()
    }catch (error){
        res.status(500).send(error)

    }
    
}