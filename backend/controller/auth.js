import {db} from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register=(req,res)=>{
    const q="SELECT * FROM users WHERE email=?";
    db.query(q,[req.body.email],(err,data)=>{
        if(err) return res.json(err);
        if (data.length) return res.status(409).json("user already exists"); 
    
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
    
        const q="INSERT INTO users(`username`,`email`,`password`,`phone`) VALUES (?)";
        const values=[
            req.body.username,
            req.body.email,
            hash,
            req.body.phone,
        ]
    
        db.query(q,[values],(err,data)=>{
            if(err) return res.json(err);
            return res.status(200).json("user has been created");
        })
    })

    
}
export const login=(req,res)=>{
    const q = "SELECT * FROM users WHERE email = ?";

    db.query(q, [req.body.email], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found!");
  
      //Check password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
  
      if (!isPasswordCorrect)
        return res.status(400).json("Wrong email or password!");
  
      const token = jwt.sign({ id: data[0].id }, "jwtkey");
      const { password, ...other } = data[0];
  
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(other);
    });
    


}
export const logout=(req,res)=>{
    res.clearCookie("access_token").status(200).json("User has been logged out")
    

    
}

// admin login
export const alogin=(req,res)=>{
    const q = "SELECT * FROM admin WHERE email = ? AND password = ?";
    db.query(q, [req.body.email, req.body.password], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data[0]);
    });
}