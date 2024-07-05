import  Express  from "express";
import {getFood} from "../controller/food.js";
import {addFood} from "../controller/food.js";
import {deleteFood} from "../controller/food.js";
import {getfood} from "../controller/food.js";
import {updatefood} from "../controller/food.js";
import {offer} from "../controller/food.js";
import {getoffer} from "../controller/food.js";
import {staff} from "../controller/food.js";
import {addstaff} from "../controller/food.js";
import {deletestaff} from "../controller/food.js";
import {pending} from "../controller/food.js";


const frouter=Express.Router();

frouter.get("/food",getFood);
frouter.post("/addfood",addFood)
frouter.delete("/deletefood/:id",deleteFood)
frouter.get("/getfood/:id",getfood)
frouter.put("/updatefood/:id",updatefood)

frouter.put("/offer",offer)
frouter.get("/getoffer",getoffer)

frouter.get("/staff",staff)
frouter.post("/addstaff",addstaff)
frouter.delete("/deletestaff/:id",deletestaff)
frouter.put("/pending/:id",pending)



export default frouter