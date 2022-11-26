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
        let shop_data = JSON.parse(Buffer.from(fs.readFileSync('./shop.json')).toString());

        let temp_items = Object.keys(shop_data.pages)
        .map(v => shop_data.pages[v].items);
        let items = [];
    
        temp_items.forEach(tmp_items => {
          items = items.concat(tmp_items)
        });
        let item = items.find(v => v.name === args[0].toLowerCase());
    
        if(!item){
           message.channel.send("no item found");
return
        }
    
        if(item.cost > user.coins){
           message.channel.send("you cannot afford this item");
return
        } else {
            await profileModel.findOneAndUpdate(
                {
                  userID: message.author.id,
                },
                {
                  $inc: {
                    coins: -item.cost,
                  },
                   $push: {
                    inventory: item
                  }
                }
              );
          message.channel.send(`You Have Just Bought ${item.name}`);
            }
    }
}