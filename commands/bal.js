const profileModel = require ( '../models/profileSchema')
module.exports={
    category:'Fun',
    description:'Displays bal information',
    // Permissions:['ADMINISTRATOR'],
// slash:'both',
    testOnly:true,
    callback:async({message})=>{

   
   let profileData;
   try {
     profileData = await profileModel.findOne({ userID: message.author.id });
     message.channel.send(`Your wallet bal is ${profileData.coins}, you banks bal is ${profileData.bank}`);
   } catch (err) {
     console.log(err);
   }
    }
}