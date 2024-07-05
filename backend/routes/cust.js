import  Express  from "express";
import { deletepreorder, getCust, putpreorder } from "../controller/cust.js";
import { deleteCust } from "../controller/cust.js";
import { getcust } from "../controller/cust.js";
import { updatecust } from "../controller/cust.js";
import { getord } from "../controller/cust.js";
import { deleteord } from "../controller/cust.js";
import { addreview } from "../controller/cust.js";
import { getreview } from "../controller/cust.js";
import { deletereview } from "../controller/cust.js";
import { orderhistory } from "../controller/cust.js";
import { gorderhistory } from "../controller/cust.js";
// import { pending } from "../controller/cust.js";
import { corderhistory } from "../controller/cust.js";
import { getpreorder } from "../controller/cust.js";
import { preorder } from "../controller/cust.js";
import { preorderhis } from "../controller/cust.js";
import { deletepreorderhis } from "../controller/cust.js";


const crouter=Express.Router();

crouter.get("/cust",getCust);
crouter.delete("/deletecust/:id",deleteCust);
crouter.put("/updatecust/:id",updatecust);
crouter.get("/getcust/:id",getcust);
crouter.get("/getord",getord);
crouter.delete("/deleteord/:id",deleteord);
crouter.post("/addreview",addreview)
crouter.get("/getreview",getreview)
crouter.delete("/deletereview/:id",deletereview)
crouter.post("/checkout",orderhistory)
crouter.get("/getord/:email",gorderhistory)
crouter.post("/mcheckout",corderhistory)
crouter.get("/getpreorder",getpreorder)
crouter.post("/preorder",preorder)
crouter.post("/putpreorder",putpreorder)
crouter.delete("/deletepreorder/:id",deletepreorder)
crouter.get("/preorderhis",preorderhis)
crouter.delete("/deletepreorderhis/:id",deletepreorderhis)





export default crouter