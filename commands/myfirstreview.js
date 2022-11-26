const {MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')
module.exports={
    category:'Fun',
    description:'Displays bal information',
slash:'both',
    testOnly:true,
    callback:async({message,interaction})=>{
     message.reply('Enter your the product you have bought.')
const filter = (m) => m.author.id === message.author.id;
const collector = message.channel.createMessageCollector({
    max:1,
    time:1000*5,
    filter
})
collector.on('collect' , async(m)=>{
    console.log(message.content + 'this is the command')
if(m.author.id === message.author.id){
    let embed = new MessageEmbed({color: 'RED', description: 'Rate your experience with our product '})
    const components = (state) => [
        new MessageActionRow().addComponents(
            new MessageButton().setCustomId('kick').setStyle('DANGER').setEmoji('<:greykick:907427405126320198>').setDisabled(state),
            new MessageButton().setCustomId('ban').setStyle('DANGER').setEmoji('<:greyban:907431350620012595>').setDisabled(state),
            new MessageButton().setCustomId('mute').setStyle('DANGER').setDisabled(state).setEmoji('<:greyrole:907263973789937664>'),
            new MessageButton().setCustomId('unmute').setStyle('DANGER').setDisabled(state).setEmoji('<:greyrole:907263973789937664>'),
            new MessageButton().setCustomId('warn').setStyle('DANGER').setDisabled(state).setEmoji('<:greyrole:907263973789937664>')
        )
    ]
    await message.channel.send({embeds: [embed], components: components(false)})
    const filter = (interaction) => interaction.user.id === message.author.id
    const collector1 = message.channel.createMessageComponentCollector({filter, componentType: 'BUTTON', time: 5000})
    collector1.on('collect', async (interaction) => {
       
        
            const embed1 = new MessageEmbed().setColor('YELLOW').setDescription(`Alright, can you write a review,it is optional, if not writing please wait`)
            const components = (state) => [
                new MessageActionRow().addComponents(
                    new MessageButton().setCustomId('kick').setStyle('SECONDARY').setEmoji('<:greykick:907427405126320198>').setDisabled(state),
                    new MessageButton().setCustomId('ban').setStyle('PRIMARY').setEmoji('<:greyban:907431350620012595>').setDisabled(state),
                )
            ]
          await   interaction.reply({embeds: [embed1],components:components(false)})
             const filter = (i) => i.user.id === message.author.id
             const collector2 = interaction.channel.createMessageComponentCollector({filter, componentType: 'BUTTON', time: 5000})
             collector1.on('collect', async (i) => {
                if (i.customId === 'kick') {
                    await channel.send({
                        embeds:[embed2]
                    })
                }
                if (i.customId === 'ban') {
                    
                }

             })
      
    })
    
collector.on("end",(collected)=>{
    //HERE DISABLE STAR BUTTON
})   
}
})
collector.on("end",(collected)=>{
    console.log(collected.size + collected + ' this is size')
if(collected.size === 0){
message.reply('You didnt enter the product name')
}

// let text = 'collected:\n\n'
// message.channel.send(text+=collected)
})   
            }
    }