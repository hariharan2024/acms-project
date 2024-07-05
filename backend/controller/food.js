import { db } from "../db.js";

export const getFood =   (req, res) => {
    
    db.query("SELECT * FROM product", (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
    
        res.json(result);
      });
 
    }
   

export const addFood =   (req, res) => {

    const q = "INSERT INTO product(`product_name`, `product_image`, `brand_id`, `category`, `quantity`, `rate`, `active`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const { product_name, product_image, brand_id, category, quantity, rate, active, status } = req.body;
    db.query(q, [product_name, product_image, brand_id, category, quantity, rate, active, status], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        return res.json("Food has been created.");
    });
}
export const deleteFood =  (req, res) => {

    const q = "DELETE FROM product WHERE product_id = ?";
    const values = req.params.id;
    db.query(q, [values], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        return res.json("Product has been deleted.");
    });
}
export const getfood =  (req, res) => {

    const q = "SELECT * FROM product WHERE product_id = ?";
    const values = req.params.id;
    db.query(q, [values], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        return res.json(result[0]);
        
    });
}

export const updatefood =  (req, res) => {

    const q = "UPDATE product SET `product_name` = ?  , `product_image` = ? , `brand_id` = ? , `category` = ? , `status` = ? , `rate` = ? , `active` = ? , `quantity` = ?  WHERE `product_id` = ?";
    const values = [
        req.body.product_name,
        req.body.product_image,
        req.body.brand_id,
        req.body.categories_id,
        req.body.status,
        req.body.rate,
        req.body.active,
        
        req.body.quantity
       
       
    ];
    db.query(q, [...values, req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        return res.json("Product has been updated.");
    });
}


export const offer = (req, res) => {

    const q = "UPDATE offer SET `title` = ?  , `disc` = ? , `quanty` = ?  WHERE `id` = 1";
    const values = [
        req.body.title,
        req.body.discount,
        req.body.quantity

    ]
    db.query(q, [...values, req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        return res.json("Offer has been updated.");
    })
}

export const getoffer = (req, res) => {

    const q = "SELECT * FROM offer";
    db.query(q, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        return res.json(result[0]);
    })
}



export const staff = (req, res) => {

    const q = "SELECT * FROM staff";
    db.query(q, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        return res.json(result);
    })
}

export const addstaff = (req, res) => {

    const q = "INSERT INTO staff(`name`, `role`, `date`) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.role,
        req.body.date
    ]
    db.query(q, [...values], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        return res.json("Staff has been created.");
    })
}

export const deletestaff = (req, res) => {

    const q = "DELETE FROM staff WHERE id = ?";
    const values = req.params.id;
    db.query(q, [values], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        return res.json("Staff has been deleted.");
    })
}


export const pending = (req, res) => {

    const id = req.params.id;
    db.query("UPDATE orders SET status = '1', token = NULL WHERE order_id = ?", [id], (err, result) => {
     console.log("result")
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
    
        res.json("Pending status updated");
      });
  
  
}