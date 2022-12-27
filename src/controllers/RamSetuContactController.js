const RamSetuContactModel = require("../models/RamSetuContactModel");


module.exports.getAllContactData = async (req,res) => {
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

module.exports.postContactData = async (req,res) => {
	try
	{
        const userToFind = await RamSetuContactModel.findOne({email:req.body.email})
        if(await userToFind){
            res.status(300).json({status:false ,userToFind ,msg: "User Already Exists" , userExist:true });
        }else{
		const users = await RamSetuContactModel.create(req.body);
		 res.status(202).json({status:true ,users, msg: "created successfully" });
		}
	}
	catch(err)
	{
		console.log(err);
		res.status(500).json({msg: "Internal Server Error"});
	}
}
module.exports.walletIdUpdateContactData = async (req,res) => {
	console.log(req.body);
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
