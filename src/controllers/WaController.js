const axios = require('axios');

async function sendMessage(data) {
  const config = {
    method: 'POST',
    url: `https://graph.facebook.com/v15.0/100290529619763/messages`,
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

function getTextMessageInput(recipient, text) {
  console.log(recipient)
  // return JSON.stringify({ "messaging_product": "whatsapp", "to": recipient, "type": "template", "template": { "name": "hello_world", "language": { "code": "en_US" } } });
  return JSON.stringify({
    "messaging_product": "whatsapp",
    "to": recipient,
    "type": "template",
    "template": {
      "name": "sample_movie_ticket_confirmation",
      "language": {
        "code": "en_US"
      },
      "components": [
        {
          "type": "header",
          "parameters": [
            {
              "type": "image",
              "image": {
                "link":"https://gateway.pinata.cloud/ipfs/QmP8SXkaY9zRQXHKQy1Mc7z8AQ5hf4aijMnYzKuRdtrde1"
              }
            }
          ]
        },
        {
          "type": "body",
          "parameters": [
            {
              "type": "text",
              "text": "Satyug Token Reward"
            },
            {
              "type": "text",
              "text": "Thank you for Filling out the Form. As a token of Reward, here is your Token. Ram Ji ki Setu mai aapka lagaya Pathar"
            },
            {
              "type": "text",
              "text": "Are you a true devotee of Ram ji? Do you want Ram ji to appear to you in his fierce form? If yes, then download the Artivive app and experience firsthand the intense form of Ram ji."
            },
            {
              "type": "text",
              "text": "Scan the picture above with the Artivive app and watch the magic happen"
            },
            // {
            //   "type": "link",
            //   "link": "https://play.google.com/store/apps/details?id=com.artivive&hl=en_IN&gl=US"
            // }
          ]
        }
      ]
    }
  }
  );
}

exports.sendWhatsappData = async (req,res) => {
  // console.log(req.body.phoneNumber)
	try
	{
        const data = getTextMessageInput(req.body.phoneNumber, 'Welcome to Satyug!');
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