const profileModel = require ( '../models/profileSchema')
module.exports={
    category:'Fun',
    description:'Displays bal information',
    minArgs:1,
    maxArgs:1,
    expectedArgs:'<Amount>',
    // Permissions:['ADMINISTRATOR'],
// slash:'both',
    testOnly:true,
    callback:async({message,args})=>{
                const amount = args[0];
                if (amount % 1 != 0 || amount <= 0) {
                    message.channel.send("Deposit amount must be a whole number");
                    return
                } 
                try {
                   let profileData = await profileModel.findOne({ userID: message.author.id });
                  if (amount > profileData.coins){
                      message.channel.send(`You don't have that amount of coins to deposit`)
                      return
                  }  
                  await profileModel.findOneAndUpdate(
                    {
                      userID: message.author.id,
                    },
                    {
                      $inc: {
                        coins: -amount,
                        bank: amount,
                      },
                    }
                  );
            
                   message.channel.send(`You deposited ${amount} of coins into your bank`);
                } catch (err) {
                  console.log(err);
                }
            }
    }
