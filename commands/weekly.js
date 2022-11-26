const profileModel = require ( '../models/profileSchema')
module.exports={
    category:'Fun',
    description:'Displays bal information',
   cooldown:'7d',
// slash:'both',
    testOnly:true,
    callback:async({message,})=>{
        try {
          const targetData = await profileModel.findOne({ userID:message.author.id });
    let amount = 1000
          await profileModel.findOneAndUpdate(
            {
              userID:message.author.id,
            },
            {
              $inc: {
                coins: amount,
              },
            }
          );
           message.channel.send(`This player has been given 1000 coins`);
        } catch (err) {
          console.log(err);
        }
            }
    }