
import { connection } from "./db.js"

//EDIT USER
export const Edit = (req , res)=>{
    console.log(req.body.data.is_online)
        const sql = 'UPDATE `user` SET full_name= ?,phone_no=?,username=?,password=? WHERE username=?'
        connection.query(sql, [req.body.data.full_name, req.body.data.phone_no, req.body.data.username, req.body.data.password,req.body.user], (err, result) => {
            if(err){
                console.log(err)
            }else{
                res.status(200).json('User Profile Edited')
            }
        })
    }




//ADDUSER
export const AddUser = (req,res)=>{
    const sql = 'INSERT INTO `user`(`full_name`, `phone_no`, `username`, `password`) VALUES (?,?,?,?)';
    connection.query(sql, [req.body.full_name, req.body.phone_no, req.body.username, req.body.password], (err, result) => {
        if(err){
            res.status(409).json('Username Or Password Already Exsit')                                
        }else{
            res.status(200).json('User Added Successfully')                                
        }
    })
}

//DELETE USER
export const Delete = (req,res)=>{
    const sql = 'DELETE FROM `user` WHERE username = ?';
    connection.query(sql, [req.body.data] , (err, result) => {
        if(err){
            console.log(err)
        }
        else{
            res.status(200).json('User Deleted')
        }                
    })
}



//GET USER LIST
export const User = (req, res) => {
    const sql = 'SELECT * FROM `user`';
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result)
       
    })

}

//LOGIN API
export const Login =  (req, res) => {
    var data = req.body;
    const sql = 'SELECT username, password FROM `user` WHERE username = ? AND password = ?';
    connection.query(sql, [data.username, data.password], (err, result) => {
        if(err) throw err
        if(result.length === 1){
   
            res.status(200).json('Login Successful')
        }else{
            res.status(404).json('Invalid Credential')
        }
    })

}


//SIGNUP API
export const Signup = (req, res) => {
    var data = req.body;
    const sql = 'INSERT INTO `user`(`full_name`, `phone_no`, `username`, `password`,`is_online`) VALUES (?,?,?,?,?)';
    connection.query(sql, [data.full_name, data.phone_no, data.username, data.password ,'1'], (err, result) => {
        if (err) {
            res.status(400).send("Duplicate")
        } else {
            res.status(200).json("Signup Successfully");
        } 
    })
}



//SET USER ONLINE/OFFLINE
export const Is_online = (req,res)=>{
    console.log(1)
    const sql = 'UPDATE user SET is_online = ? WHERE username = ?';
    connection.query(sql, [req.body.is_online , req.body.data], (err, result) => {
        if (err) throw err;
        res.send(result)
    })
  }

