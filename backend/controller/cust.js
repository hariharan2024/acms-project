import { db } from "../db.js";

export const getCust =   (req, res) => {
    
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
    
        res.json(result);
      });
 
    }
   

export const deleteCust = (req, res) => {
    
    const id = req.params.id;
    db.query("DELETE FROM users WHERE id = ?", id, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
    
        res.json("User has been deleted");
      });
}

export const updatecust = (req, res) => {

    const id = req.params.id;
    const { username, email, phone } = req.body;
    db.query("UPDATE users SET username = ?, email = ?, phone = ? WHERE id = ?", [username, email, phone, id], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
    
        res.json("User has been updated");
      });
}

export const getcust = (req, res) => {

    const id = req.params.id;
    db.query("SELECT * FROM users WHERE id = ?", id, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
    
        res.json(result[0]);
      });
}

export const getord = (req, res) => {

    db.query("SELECT * FROM orders", (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
    
        res.json(result);
      });
}

export const deleteord = (req, res) => {

    const id = req.params.id;
    db.query("DELETE FROM orders WHERE order_id = ?", id, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
    
        res.json("Order has been deleted");
      });
  
}

export const addreview = (req, res) => {
  
    const { rating, comment, product_id ,product_name} = req.body;
    db.query("INSERT INTO reviews (rating, comment, user_name,name) VALUES (?, ?, ?, ?)", [rating, comment, product_id,product_name], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
    
        res.json("Review has been added");
      });
}
export const  getreview = (req, res) => {

    db.query("SELECT * FROM reviews", (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
    
        res.json(result);
      });
}

export const deletereview = (req, res) => {

    const id = req.params.id;
    db.query("DELETE FROM reviews WHERE id = ?", id, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
    
        res.json("Review has been deleted");
      });
}

export const orderhistory = (req, res) => {
  const { email, phone, did, t, status ,token} = req.body;
  // console.log("asdfghjkllkjhgfdsasdfghjk",did);
  if (!did.length) {
    return res.send('Cart is empty');
  }

 


  // Extract product_name and rate from each item in cartItems
  const itemsToStore = did.map(item => ({
    product_id: item.product_id,
    product_name: item.product_name,
    rate: item.rate,
  }));
  console.log(itemsToStore);

  // Stringify the modified array
  const itemsToStoreJSON = JSON.stringify(itemsToStore);

  const sql = `INSERT INTO orders (pname, order_date, status, email, phone, token) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [itemsToStoreJSON, t, status || null, email || null, phone || null, token||null];

  // Update product quantities in the database
  itemsToStore.forEach(item => {
    const updateSql = `UPDATE product SET quantity = quantity - 1 WHERE product_id = ?`;
    const updateValues = [item.product_id];
    
    db.query(updateSql, updateValues, (updateError, updateResults, updateFields) => {
      if (updateError) {
        console.error('Error updating product quantity:', updateError);
      }
    });
  });

  // Insert order data into the database
  db.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error('Error inserting data into the database:', error);
      return res.status(500).send('Error inserting data into the database');
    }
    res.send('Checkout completed successfully');
  });
};


export const gorderhistory= (req, res) => {

    const email = req.params.email;
    db.query("SELECT * FROM orders WHERE email = ?", email, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
    
        res.json(result);
      });
}

export const corderhistory = (req, res) => {
  const { email, phone, did, t, status ,token} = req.body;
  // console.log("asdfghjkllkjhgfdsasdfghjk",did);
  if (!did.length) {
    return res.send('Cart is empty');
  }

 


  // Extract product_name and rate from each item in cartItems
  const itemsToStore = did.map(item => ({
    product_id: item.product_id,
    product_name: item.product_name,
    rate: item.rate,
    
  }));
  console.log(itemsToStore);

  // Stringify the modified array
  const itemsToStoreJSON = JSON.stringify(itemsToStore);

  const sql = `INSERT INTO orders (pname, order_date, status, email, phone, token) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [itemsToStoreJSON, t, status || null, email || null, phone || null, token||null];

  // Update product quantities in the database
  did.forEach(item => {
    const updateSql = `UPDATE product SET quantity = quantity - ? WHERE product_id = ?`;
    const updateValues = [item.quantity, item.product_id];
    
    db.query(updateSql, updateValues, (updateError, updateResults, updateFields) => {
      if (updateError) {
        console.error('Error updating product quantity:', updateError);
      }
    });
  });

  // Insert order data into the database
  db.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error('Error inserting data into the database:', error);
      return res.status(500).send('Error inserting data into the database');
    }
    res.send('Checkout completed successfully');
  });
};


export const getpreorder= (req, res) => {

    db.query("SELECT * FROM preproduct", (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
    
        res.json(result);
      });
  
}

export const preorder = (req, res) => {
  const {orderData, email,phone } = req.body;
console.log(orderData)

const itemsToStore = orderData.map(item => ({
  product_id: item.id,
  name: item.name,
  price: item.price,
  quantity: item.quantity,
  pickupDatetime: item.pickupDatetime,
  orderDate: item.orderDate,
  
}));
console.log(itemsToStore);

// Stringify the modified array
const itemsToStoreJSON = JSON.stringify(itemsToStore);
  // Insert preorder data into preorders table
  const sql = 'INSERT INTO preorder (pname, phone, email) VALUES (?, ?, ?)';
  const values = [itemsToStoreJSON,phone, email];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error placing preorder:', err);
      res.status(500).json({ error: 'Error placing preorder' });
      return;
    }
    console.log('Preorder placed successfully');
    res.json({ message: 'Preorder placed successfully' });
  });
}

export const putpreorder = (req, res) => {
  const { name, price, quantity } = req.body;
  const sql = 'INSERT INTO preproduct (name, price, quantity) VALUES (?, ?, ?)';
  const values = [ name, price, quantity];
  
  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error inserting preorder:', err);
      res.status(500).json({ error: 'Error placing preorder' });
      return;
    }
    console.log('Preorder inserted successfully');
    res.json({ message: 'Preorder inserted successfully' });
  });
}

export const deletepreorder = (req, res) => {
  const { id } = req.params; // Access id from request params
  console.log(id);
  const sql = 'DELETE FROM preproduct WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error deleting preorder:', err);
      res.status(500).json({ error: 'Error deleting preorder' });
      return;
    }
    console.log('Preorder deleted successfully');
    res.json({ message: 'Preorder deleted successfully' });
  });
};

export const preorderhis = (req, res) => {

    db.query("SELECT * FROM preorder", (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
    
        res.json(result);
      });
  
}

export const deletepreorderhis = (req, res) => {
  const { id } = req.params; // Access id from request params

  db.query("DELETE FROM preorder WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json({ message: 'Preorder item deleted successfully' });
  });
};
