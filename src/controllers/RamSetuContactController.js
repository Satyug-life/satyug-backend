const RamSetuContactModel = require("../models/RamSetuContactModel");


exports.getAllContactData = async (req,res) => {
	try
	{
		const users = await RamSetuContactModel.find();
		res.status(200).json({status:true ,users, msg: "Found successfully" });
	}
	catch(err)
	{
		console.log(err);
		res.status(500).json({status:false ,msg: "Internal Server Error"});
	}
}

exports.postContactData = async (req,res) => {
	try
	{
        const userToFind = await RamSetuContactModel.findOne({email:req.body.email})
        if(await userToFind){
           return res.status(300).json({status:false ,userToFind ,msg: "User Already Exist" , userExist:true });
        }
		const users = await RamSetuContactModel.create(req.body);
		return res.status(200).json({status:true ,users, msg: "created successfully" });
	}
	catch(err)
	{
		console.log(err);
		res.status(500).json({msg: "Internal Server Error"});
	}
}
exports.walletIdUpdateContactData = async (req,res) => {
	try
	{
        const userToFind = await RamSetuContactModel.findOne({email:req.body.email})
        if(!userToFind){
           return res.status(404).json({status:false ,users, msg: "User Does not Exist"});
        }
		const users = await RamSetuContactModel.findOneAndUpdate({email:req.body.email} , {walletId:req.body.walletId});
		return res.status(200).json({status:true ,users, msg: "Updated successfully" });
	}
	catch(err)
	{
		console.log(err);
		res.status(500).json({status:false ,msg: "Internal Server Error"});
	}
}
