import userSchema from './model/user.model.js'
import postSchema from './model/addpost.model.js'
import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken';
const {sign} =pkg


export async function adduser(req,res) {
    console.log(req.body);
    const {name,email,phone,pass,cpass,pic}=req.body
    if(!(name&&email&&phone&&pass&&cpass))
        return res.status(500).send({msg:"invalid input"})
    else if(pass!=cpass)
        return res.status(500).send({msg:"password missmatch"})

    bcrypt.hash(pass,10).then((hpwd)=>{
        console.log(hpwd)
        console.log("data added");
        userSchema.create({name,email,phone,pass:hpwd,pic}).then(()=>{
            res.status(201).send({msg:"Successfull"})
        }).catch((error)=>{
            res.status(404).send({error:error})
        }) 
        
    }).catch((error)=>{
        console.log(error)
        
    })
    
}


export async function login(req,res) {

    console.log(req.body);
    const { email,pass} = req.body;

    console.log(email,pass);

    if (!(email && pass))
        return res.status(500).send({msg:"fields are empty"})
    const user= await userSchema.findOne({email})

    if (!user)
        return res.status(500).send({msg:"user not exist"})
    const success= await bcrypt.compare(pass,user.pass)
    console.log(success);

    if (success!== true)
        return res.status(500).send({msg:"user or password not exist"})
    const token= await sign({userID:user._id},process.env.JWT_KEY,{expiresIn:"24h"})
    res.status(200).send({token})
    
    
}

export async function home(req,res) {

    console.log("end point");

    console.log(req.user.userID);
    const user=userSchema.findOne({_id:req.user.userID})
    res.status(200).send({user:user.username})
    
    
    
}

export async function getdata(req, res) {
    console.log("==================================================");
    console.log(req.user);
    
    const usr = await userSchema.findOne({_id:req.user.userID});
    // console.log(usr);
    const data=await postSchema.find()
    console.log(data);
    

    console.log("get data");
    res.status(200).send({usr,data}); 
}

export async function getuserdata(req, res) {
        console.log("**************************************");
        console.log(req.user);

        const usr = await userSchema.findOne({ _id: req.user.userID });
        console.log(usr);
        
        
        const post = await postSchema.find({ id: req.user.userID });
        console.log(post);

        console.log("get post");

        res.status(200).send({ usr, post });
     
}


export async function addpost(req,res) {
    console.log(req.body);
    console.log(req.user.userID);
    
    

    const{pic,caption,description}=req.body
    await postSchema.create({id:req.user.userID,image:pic,caption,description}).then(()=>{
        res.status(201).send({msg:"successfull"})
    }).catch((error)=>{
        res.status(404).send({error:error})
    })
    
}

export async function deleteUser( req,res ) {

    // console.log(req.params);

    const {id} = req.params;
    const data = await userSchema.deleteOne({_id:id})
    .then(()=>{
        res.status(201).send({msg:"deleted"});
    })
    .catch((error)=>{
        res.status(500).send({error})
    })
    
}


export async function showPost(req,res) {
    // console.log(req.params.id);
    const id=req.params.id
    const post=await postSchema.findOne({_id:id})
    // console.log(post);
    res.status(200).send({post})
}

export async function update(req,res) {
    // console.log(req.user.UserID);
    // console.log(req.body);
    const {...data}=req.body
    await postSchema.updateOne({_id:req.params.id},{$set:{id:req.user.UserID,...data}}).then(()=>{
        res.status(201).send({msg:"updated"})
    }).catch((error)=>{
        res.status(500).send({error:error})  
    })  
}

export async function deletePost(req, res) {
    // console.log(req.params); 
    const { id } = req.params;  
    const data = await postSchema.deleteOne({ _id: id })
        .then(() => {
            res.status(201).send({ msg: "Deleted" });
        })
        .catch((error) => {
            res.status(500).send({ error });
        });
}