const profileModel = require ( '../models/profileSchema')
module.exports={
    category:'Fun',
    description:'Displays bal information',
   cooldown:'24h',
// slash:'both',
    testOnly:true,
    callback:async({message,})=>{
        try {
          const targetData = await profileModel.findOne({ userID: message.author.id });
    let amount = 100
          await profileModel.findOneAndUpdate(
            {
              userID: message.author.id,
            },
            {
              $inc: {
                coins: amount,
              },
            }
          );
           message.channel.send(`This player has been given 100 coins`);
        } catch (err) {
          console.log(err);
        }
            }
    }