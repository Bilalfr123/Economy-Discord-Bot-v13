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
        let index = (args[0] || "1");
        let page = shop_data.pages[index];
    
        if(!page) {
          return message.channel.send("no page found")
        }
    
        const shop = new MessageEmbed()
        .setTitle("Shop")
        .setColor("RANDOM")
        for(let item of page.items){
          console.log(item);
          if('hidden' in item){
            if(!item.hidden){
              continue;
            }
          }
          shop.addField(item.name,
             `Description:\`${item.description || "None"}\`\ncost: \`${item.cost || "Null"}\``);
          }
    
        await message.channel.send({
            embeds:[shop]});
            }
    }