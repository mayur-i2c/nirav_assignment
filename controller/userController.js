const {
  createResponse,
  successResponce,
  queryErrorRelatedResponse,
  deleteResponce,
} = require("../utils/sendResponse");
const deleteFiles = require("../utils/deletefiles");
const Users = require("../Models/Users");
const mongoose=require("mongoose");

const adduserController = async (req, res, next) => {
  try {
    const { name, summary } = req.body;
    // Checking for file
    if (!req.file)
      return queryErrorRelatedResponse(req, res, 404, "Please select file.");
    //Create new user
    const newUser = await Users.create({
      name,
      summary,
    });
    newUser.image = req.file.filename;
    const result = await newUser.save();
    return createResponse(req, res, result);
  } catch (error) {
    return next(error);
  }
};

const getuserController = async (req, res, next) => {
  try {
    const result = await Users.find();
    successResponce(req, res, result);
  } catch (error) {
    next(error);
  }
};

const updateuserController = async(req, res, next) => {
  try {
    const { name,summary } = req.body;
    const user = await Users.findById(req.params.id);
    if (!user)
      return queryErrorRelatedResponse(req, res, 404, "user not found.");
    if (req.file) {
      deleteFiles(user.image);
      user.image = req.file.filename;
    }
    user.name = name;
    user.summary=summary
    const result = await user.save();
    return successResponce(req, res, result);
  } catch (error) {
    next(error);
  }
};

const deleteuserController=async(req,res,next)=>{
    try {
        // Conver string is into Object id
        const id= mongoose.Types.ObjectId(req.params.id)
        const user = await Users.findById(id);
        if(!user) return queryErrorRelatedResponse(req,res,404,"user not found.");
        deleteFiles(user.image);
        user.delete();
        deleteResponce(req,res,"Category deleted successfully.");        
    } catch (error) {
        next(error);
    }
}

module.exports = { adduserController, getuserController, updateuserController, deleteuserController};
