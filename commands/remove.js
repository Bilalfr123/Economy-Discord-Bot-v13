const profileModel = require ( '../models/profileSchema')
module.exports={
    category:'Fun',
    description:'Displays bal information',
    minArgs:2,
    maxArgs:2,
    expectedArgs:'<user> <Amount>',
    Permissions:['ADMINISTRATOR'],
// slash:'both',
    testOnly:true,
    callback:async({message,args,client})=>{
        if (!args.length) {
            message.channel.send("You need to mention a player to remove them coins");
            return
        } 
        const amount = args[1];
        const target = message.mentions.users.first();
        if (!target) {
             message.channel.send("That user does not exist");
             return
        }
    
        if (amount % 1 != 0 || amount <= 0) {
            message.channel.send("Given amount must be a whole number");
            return
        } 
    
        try {
          const targetData = await profileModel.findOne({ userID: target.id });
          if (!targetData) { message.channel.send(`This user doens't exist in the db`);
          return
        }
        if (amount > targetData.coins){
            message.channel.send(`You don't have that amount of coins to remove`)
            return

        } 
    
          await profileModel.findOneAndUpdate(
            {
              userID: target.id,
            },
            {
              $inc: {
                coins: -amount,
              },
            }
          );
     await client.users.fetch(target.id).then((target)=>{
        target.send(
           `you have been removed their coins! ${amount} of coins!`
    )
        })
           message.channel.send(`This player has been removed their coins! ${amount} of coins!`);
        } catch (err) {
          console.log(err);
        }
            }
    }