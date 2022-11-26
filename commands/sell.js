const profileModel = require ( '../models/profileSchema')
const { MessageEmbed } = require('discord.js');
const fs = require('fs')
module.exports={
    category:'Fun',
    description:'Displays bal information',
// slash:'both',
    testOnly:true,
    callback:async({message,args,client})=>{
        let user = await profileModel.findOne({
            userID:message.author.id
        });
        let item = user.inventory.find(v => v.name === args[0].toLowerCase());
        if(!item){
          message.channel.send("No Item Found In Inventory");
           return
        }
        await profileModel.findOneAndUpdate(
            {
              userID: message.author.id,
            },
            {
                $pull: {
                    inventory: item
                  },
                  $inc: {
                    coins: Math.round(item.cost * 2/3)
                  }
            }
          );
    
        await message.channel.send(`You sold ${item.name} and recieved ${Math.round(item.cost * 2/3)} coins.`)
            
    }
}