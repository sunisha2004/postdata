import { Router } from "express";
 import * as rh from './reqhandler.js'
 import Auth from "./middleware/Auth.js";

 const router=Router();
 router.route('/addpost').post(Auth,rh.addpost)
 router.route('/adduser').post(rh.adduser)
 router.route('/login').post(rh.login)
 router.route('/getdata').get(Auth,rh.getdata)
router.route("/getuserdata").get(Auth,rh.getuserdata)
router.route('/deleteuser/:id').delete(rh.deleteUser)
router.route('/showPost/:id').get(rh.showPost)
router.route('/update/:id').put(Auth,rh.update)
router.route('/deletePost/:id').delete(rh.deletePost)

 export default router;