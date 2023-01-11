const axios = require('axios');

async function sendMessage(data) {
  const config = {
    method: 'POST',
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.FACEBOOKGRAPHURLID}/messages`,
    headers: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    data: data
  };
 console.log("send message running")
 const x =  axios(config).then(resp=>{
  console.log(resp.data, "response");
})  
.catch(error=>{
console.log(error,"error occured")
});
  return x
}

function getTextMessageInput(recipient, name) {
  console.log(recipient)
  // return JSON.stringify({ "messaging_product": "whatsapp", "to": recipient, "type": "template", "template": { "name": "hello_world", "language": { "code": "en_US" } } });
  return JSON.stringify({ "messaging_product": "whatsapp",
  "to": recipient,
  "type": "template",
  "template": {
       "name": "satyug001",
       "language": {
         "code": "en"
       },
     "components": [
     {
         "type": "body",
         "parameters": [
             {
                 "type": "text",
                 "text": name
             },
              {
                 "type": "text",
                 "text": "Collectible"
             }
         ]
     }
 ]
  }}
  );
}

exports.sendWhatsappData = async (req,res) => {
  // console.log(req.body.phoneNumber)
	try
	{
        const data = getTextMessageInput(req.body.phoneNumber ,req.body.name);
        try {
          sendMessage(data);
        } catch (error) {
          console.log(error)
        }
		res.status(200).json({status:true ,data, msg: "Whatsapp Data Sent" });
	}
	catch(err)
	{
		console.log(err);
		res.status(500).json({status:false ,msg: "Internal Server Error from Wa Controller"});
	}
}





// curl -i -X POST \
//   https://graph.facebook.com/v15.0/100290529619763/messages \
//   -H 'Authorization: Bearer EAAR19LPETPABAMNtFDshtJhvadZADcMAQKVa8yiulU0amlwDqETmnyUCQUqhTmVlzkPl08zd2YNy0ZBlgh5tjQ4kl6uCe5P8PdtYfRu7EGZCRtTWZCG1J6NnGNIA4JZC9m9iRcVTx4uiMeEBmFy5hDGMlaFwjIDwO5VDp3OCE4m3ZB8fspQVwoWNw2wiGC4B7fVIqSVtjncJrXyoRjgdgF' \
//   -H 'Content-Type: application/json' \
//   -d '{ "messaging_product": "whatsapp", "to": "917503374695", "type": "template", "template": { "name": "hello_world", "language": { "code": "en_US" } } }'