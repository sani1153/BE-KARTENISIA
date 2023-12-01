const UserModels = require('../models/users');

const getAllUsers = async (req, res) => {
    try {
        const [data] = await UserModels.getAllUsers();
    
        res.json({
            message:"GET ALL USERS success",
            data: data
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage : error
        })
    }
}

const createUser = async (req, res) => {
    const {body} = req;

    if(!body.name || !body.email | !body.password){
        return res.status(400).json({
            message: "Data yang anda masukkan tidak lengkap",
            data: null
        })
    }
    try {
        await UserModels.createNewUser(body);
        res.status(201).json({
            message:"CREATE USER success",
            data: body
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage : error
        })
    }
}

const updateUser = async (req, res) => {
    const {idUser} = req.params;
    const {body} = req;
    try {
        await UserModels.updateUser(body, idUser);
        res.json({
            message:"UPDATE USER success",
            data: {
                id: idUser, 
                ...body
            }
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage : error
        })
    }
}

const deleteUser = async (req, res) => {
    const {idUser} = req.params;
    try {
        await UserModels.deleteUser(idUser);
        res.json({
            message:"DELETE USER success",
            data: null
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage : error
        })
    }
}

module.exports = {
    getAllUsers, 
    createUser,
    updateUser,
    deleteUser,
}