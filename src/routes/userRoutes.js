const express =require("express");
const verifyToken= require("../middlewares/authMiddleware")
const authorizeRoles = require("../middlewares/roleMiddleware")
const router = express.Router();

//Only admin
router.get("/admin", verifyToken, authorizeRoles("admin"), (req,res)=>{
    res.json({message: "welcome admin"})
});

//Both can access it
router.get("/user",verifyToken, authorizeRoles("admin","user"), (req,res)=>{
    res.json({message: "welcome user"})
});

module.exports= router;
