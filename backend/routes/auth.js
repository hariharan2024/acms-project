import  Express  from "express";
import { login, logout, register } from "../controller/auth.js";
import {alogin} from "../controller/auth.js"


const lrouter=Express.Router();

lrouter.post("/register",register)
lrouter.post("/login",login)
lrouter.post("/logout",logout)
lrouter.get("/alogin",alogin)

export default lrouter