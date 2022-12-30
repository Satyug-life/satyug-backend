const TokenModel = require("../models/TokenModel");

exports.getAllTokenData = async (req,res) => {
	try
	{
		const users = await TokenModel.find();
		res.status(200).json({status:false ,status:true ,users, msg: "Found successfully" });
	}
	catch(err)
	{
		console.log(err);
		res.status(500).json({status:false ,msg: "Internal Server Error"});
	}
}

exports.getSetuTokenData = async (req,res) => {
	try
	{
		const users = await TokenModel.find({tokenType:'Setu'});
		res.status(200).json({status:true ,users, msg: "Found successfully" });
	}
	catch(err)
	{
		console.log(err);
		res.status(500).json({status:false ,msg: "Internal Server Error"});
	}
}

exports.getKarmaTokenData = async (req,res) => {
	try
	{
		const users = await TokenModel.find({tokenType:'Karma'});
		res.status(200).json({status:true ,users, msg: "Found successfully" });
	}
	catch(err)
	{
		console.log(err);
		res.status(500).json({status:false ,msg: "Internal Server Error"});
	}
}
exports.postKarmaTokenData = async (req,res) => {
	try
	{
		const users = await TokenModel.find({tokenType:'Karma',email:req.body.email});
        if(users.length>4){
           return res.status(400).json({status:false ,users, msg: "Cannot Send Token" });
        }
        await TokenModel.create({...req.body , tokenType:'Karma'});
		res.status(200).json({status:true ,users, msg: "Token sent" });
	}
	catch(err)
	{
		console.log(err);
		res.status(500).json({status:false ,msg: "Internal Server Error"});
	}
}

exports.postTokenData = async (req,res) => {
	try
	{
		const users = await TokenModel.create(req.body);
		res.status(200).json({status:true ,users, msg: "Created successfully" });
	}
	catch(err)
	{
		console.log(err);
		res.status(500).json({status:false ,msg: "Internal Server Error"});
	}
}
