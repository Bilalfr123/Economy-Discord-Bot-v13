
const { MessageEmbed, MessageActionRow, MessageButton, Emoji } = require('discord.js')
 module.exports = (client) =>{
    client.on('interactionCreate', async(interaction)=>{
        console.log(`created`)
     
        if(!interaction.isButton()) return;
        console.log(`1created`)
        const {guild,customId,member} = interaction
        if(!['1star1','2star1','3star1','4star1','5star1', 'STAFF_REPLY'].includes(customId))return;
        let customid = interaction.message.components[0].components[0].customId
        let label = interaction.message.components[0].components[0].label
        let emoji = interaction.message.components[0].components[0].emoji
        switch (customId) {
            case 'STAFF_REPLY':
                if(!member.permissions.has('ADMINISTRATOR'))return interaction.reply({content:'These buttons are staff only',
                ephemeral:true});
                try {
                    
                    interaction.reply({
                       content:'Enter the reply you want to give to this review',
                       ephemeral:true
                   })
                } catch (error) {
                   console.log(error) 
                }
const filter = (message) => message.author.id === interaction.user.id;
const collector1 = interaction.channel.createMessageCollector({
    max:1,
    time:1000*15,
    filter
})

collector1.on('collect' , async(message)=>{
    const embed = new MessageEmbed(interaction.message.embeds[0])
    .addFields([{ name: "**Reply from staff**", value: `${message.content}`, inline: false }])
    const components1 = 
        (state) => [
            new MessageActionRow().addComponents(
                new MessageButton().setCustomId(customid).setStyle('PRIMARY').setLabel(label).setEmoji(emoji).setDisabled(state),
             
            )
        ]
// await interaction.update({
//     embeds: [embed],
// })
try {
    
    await message.channel.send({
        embeds:[embed],
        components:components1(false)
    })
    await message.delete()
} catch (error) {
    console.log(error)
}
    
})
collector1.on("end",(collected)=>{
    if(collected.size === 0){
        interaction.channel.send(`You didnt enter any message.Please try again.`)
        return
        }
    })
    
                    break;
                    case '1star1':
                        interaction.reply({
                            content:'Review given by our client',
                            ephemeral:true
                        })
                        break;
                    case '2star1':
                        interaction.reply({
                            content:'Review given by our client',
                            ephemeral:true
                        })
                        break;
                    case '3star1':
                        interaction.reply({
                            content:'Review given by our client',
                            ephemeral:true
                        })
                        break;
                    case '4star1':
                        interaction.reply({
                            content:'Review given by our client',
                            ephemeral:true
                        })
                        break;
                    case '5star1':
                        interaction.reply({
                            content:'Review given by our client',
                            ephemeral:true
                        })
                        break;
            }
    })
 }