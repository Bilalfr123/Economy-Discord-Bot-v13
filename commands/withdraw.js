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
                    message.channel.send("Withdraw amount must be a whole number");
                    return
                } 
                try {
                   let profileData = await profileModel.findOne({ userID: message.author.id });
                  if (amount > profileData.bank){
                      message.channel.send(`You don't have that amount of coins to withdraw`)
                      return
                  }  
                  await profileModel.findOneAndUpdate(
                    {
                      userID: message.author.id,
                    },
                    {
                      $inc: {
                        bank: -amount,
                        coins: amount,
                      },
                    }
                  );
            
                   message.channel.send(`You withdrew ${amount} of coins from your bank`);
                } catch (err) {
                  console.log(err);
                }
            }
    }