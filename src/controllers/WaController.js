const axios = require('axios');

function sendMessage(data) {
  const config = {
    method: 'POST',
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/message?access_token=`+process.env.ACCESS_TOKEN,
    headers: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    data: data
  };
 console.log("send message running")
  return axios(config)
}

function getTextMessageInput(recipient, text) {
  return JSON.stringify({
    "messaging_product": "whatsapp",
    "preview_url": false,
    "recipient_type": "individual",
    "to": recipient,
    "type": "text",
    "text": {
        "body": text
    }
  });
}

exports.sendWhatsappData = async (req,res) => {
	try
	{
        const data = getTextMessageInput(process.env.RECIPIENT_WAID, 'Welcome to Satyug!');
        sendMessage(data);
		res.status(200).json({status:true ,data, msg: "Whatsapp Data Sent" });
	}
	catch(err)
	{
		console.log(err);
		res.status(500).json({status:false ,msg: "Internal Server Error from Wa Controller"});
	}
}