const profileModel = require ( '../models/profileSchema')
const { MessageEmbed } = require('discord.js');
module.exports={
    category:'Fun',
    description:'Displays bal information',
// slash:'both',
    testOnly:true,
    callback:async({message,args,client})=>{
        let user = await profileModel.findOne({
            userID:message.author.id
        });
        let temp_items = user.inventory.map(item => item.name);
        let items = [];
    
        temp_items.forEach(itemName => {
          if(!items.find(v => v.name === itemName)){
            items.push({
              amount: temp_items.filter(temp_item => temp_item === itemName).length,
              name: itemName
            });
          }
        });
    
        items = items.map(item => `**${item.name}** x\`${item.amount}\``)
    
        const inventory = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Inventory")
        .setAuthor({
          name:`${message.author.username}`,
          iconURL:`${message.author.avatarURL()}`
      })
        .setDescription(`${items.join('\n\t')}`)
    
       
        await message.channel.send({
          embeds:[inventory]});
          
            }
    }