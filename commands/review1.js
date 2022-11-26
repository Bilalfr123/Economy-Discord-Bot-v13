const {MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')
const { Modal, TextInputComponent } = require('discord-modals')
module.exports={
    category:'Fun',
    description:'Type review',
slash:'both',
    testOnly:true,
    options: [
        {
            name: 'product_name',
            type: 'STRING',
            description: 'The product you have bought.',
            required: true
        },
    ],
    callback:async({message,interaction,client,guild})=>{
        let id;
        let emoji;
        let label;
        const productName = interaction.options.getString('product_name')
        console.log(productName)
        let embed = new MessageEmbed({color: 'RED', description: 'Please rate your experience with our product and service.'})
        const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageButton().setCustomId('1star').setStyle('SUCCESS').setEmoji('⭐').setDisabled(state).setLabel('1'),
                new MessageButton().setCustomId('2star').setStyle('SUCCESS').setEmoji('⭐').setDisabled(state).setLabel('2'),
                new MessageButton().setCustomId('3star').setStyle('SUCCESS').setDisabled(state).setEmoji('⭐').setLabel('3'),
                new MessageButton().setCustomId('4star').setStyle('SUCCESS').setDisabled(state).setEmoji('⭐').setLabel('4'),
                new MessageButton().setCustomId('5star').setStyle('SUCCESS').setDisabled(state).setEmoji('⭐').setLabel('5')
            )
        ]
        try {
            await interaction.reply({embeds: [embed], components: components(false)})
            
        } catch (error) {
            console.log(error)
        }
const filter = (i) => i.user.id === interaction.user.id;
const collector = interaction.channel.createMessageComponentCollector({filter, componentType: 'BUTTON', time: 1000*10})
collector.on('collect' , async(i)=>{
    if(i.customId == i.message.components[0].components[0].customId){
        id = i.customId
        emoji = i.message.components[0].components[0].emoji
        label = i.message.components[0].components[0].label

    }
    else if(i.customId == i.message.components[0].components[1].customId){
        id = i.customId
        emoji = i.message.components[0].components[1].emoji
        label = i.message.components[0].components[1].label

    }
    else if(i.customId == i.message.components[0].components[2].customId){
        id = i.customId
        emoji = i.message.components[0].components[2].emoji
        label = i.message.components[0].components[2].label

    }
    else if(i.customId == i.message.components[0].components[3].customId){
        id = i.customId
        emoji = i.message.components[0].components[3].emoji
        label = i.message.components[0].components[3].label

    }
    else if(i.customId == i.message.components[0].components[4].customId){
        id = i.customId
        emoji = i.message.components[0].components[4].emoji
        label = i.message.components[0].components[4].label

    }
    const embed1 = new MessageEmbed().setColor('YELLOW').setDescription(`Alright, can you write a review.`)
   
    try {
        await i.reply({
            embeds:[embed1],
                })
        
    } catch (error) {
        console.log(error)
    }
    
 
    const filter = (message) => message.author.id === i.user.id;
    const collector1 = i.channel.createMessageCollector({
        max:1,
        time:1000*10,
        filter
    })
  
    collector1.on('collect' , async(message)=>{
        const channel= guild.channels.cache.get('947151507340542012')
        await  message.reply(`Done, your review has been recorded and sent to ` + `${channel}`)

        const embed1 = new MessageEmbed().setColor('RANDOM').setAuthor({
            name:`New review from ${interaction.user.tag}`,
            iconURL:`${interaction.user.displayAvatarURL({dynamic:true})}`
        })
        .setFooter({
           text:`${message.guild.name}`,
            iconURL:`${message.guild.iconURL()}`
        }).addField(`${productName}`,`${message.content}`, false)
        .setTimestamp()
        const components1 = 
        (state) => [
            new MessageActionRow().addComponents(
                new MessageButton().setCustomId(id + '1').setStyle('PRIMARY').setLabel(label).setEmoji(emoji).setDisabled(state),
                new MessageButton().setCustomId('STAFF_REPLY').setStyle('SECONDARY').setLabel('Leave a reply').setDisabled(state),
            )
        ]
        try {
            
            await channel.send({
                embeds:[embed1],
    components:components1(false)
            })
        } catch (error) {
            console.log(error)
        }

    })
    collector1.on("end",(collected)=>{
        if(collected.size === 0){
            i.channel.send(`You didnt enter any review.Please try again.`)
            return
            }
       
    })
})   
collector.on('end', () => {
    try {
                
        interaction.editReply({components: components(true)})
    } catch (error) {
        console.log(error)
    }
})
            }
    }