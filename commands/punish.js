const {MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')
module.exports={
    category:'Fun',
    // Permissions:['ADMINISTRATOR'],
slash:'both',
    testOnly:true,
description: 'Moderates a user',
options: [
    {
        name: 'user',
        type: 'USER',
        description: 'The user to moderate',
        required: true
    },
    {
        name: 'reason',
        type: 'STRING',
        description: 'The reason for moderation',
        required: false
    }
],
callback:async({interaction,client})=>{
    const member = interaction.options.getMember('user')
    const reason = interaction.options.getString('reason') || 'No reason specified.'
  console.log(member.roles.highest.position)
  console.log(interaction.member.roles.highest.position)
    if (member.id === interaction.guild.ownerId) return interaction.reply({embeds: [new MessageEmbed().setDescription('I cannot moderate the server owner').setColor('RED')], ephemeral: true})
    // if (member.permissions.has('ADMINISTRATOR')) return interaction.reply({embeds: [new MessageEmbed().setDescription(`I can't moderate an admin.`).setColor('GREEN')], ephemeral: true})
    if (member.id === interaction.user.id) return interaction.reply({content: 'I cannot moderate myself.', ephemeral: true})
    if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({embeds: [new MessageEmbed().setDescription(`I can't moderate this user.`).setColor('GREEN')], ephemeral: true})
    let embed = new MessageEmbed({color: 'RED', description: 'Please choose an action to perform on ' + member.toString()})
    const components = (state) => [
        new MessageActionRow().addComponents(
            new MessageButton().setCustomId('kick').setLabel('Kick').setStyle('DANGER').setEmoji('<:greykick:907427405126320198>').setDisabled(state),
            new MessageButton().setCustomId('ban').setLabel('Ban').setStyle('DANGER').setEmoji('<:greyban:907431350620012595>').setDisabled(state),
            new MessageButton().setCustomId('mute').setLabel('Mute').setStyle('DANGER').setDisabled(state).setEmoji('<:greyrole:907263973789937664>'),
            new MessageButton().setCustomId('unmute').setLabel('Unmute').setStyle('DANGER').setDisabled(state).setEmoji('<:greyrole:907263973789937664>'),
            new MessageButton().setCustomId('warn').setLabel('Warn').setStyle('DANGER').setDisabled(state).setEmoji('<:greyrole:907263973789937664>')
        )
    ]
    try {
        
        await interaction.reply({embeds: [embed], components: components(false)})
    } catch (error) {
        console.log(error)
    }
    const filter = (i) => i.user.id === interaction.user.id
    const collector = interaction.channel.createMessageComponentCollector({filter, componentType: 'BUTTON', time: 25000})

    collector.on('collect', async (i) => {
        if (i.customId === 'kick') {
            if (!interaction.member.permissions.has('KICK_MEMBERS')) return i.reply({embeds: [new MessageEmbed().setDescription(`<:greycross:907281080275599401> You need the \`KICK_MEMBERS\` permission to use this command.`).setColor('RED')], ephemeral: true})
            await member.kick(reason)
            const embed1 = new MessageEmbed().setColor('YELLOW').setDescription(`<:greykick:917265334296281179> Successfully kicked ${member.toString()} for \`${reason}\``)
            try {
                
                i.update({embeds: [embed1]})
            } catch (error) {
                console.log(error)
            }
        } else if (i.customId === 'ban') {
            if (!interaction.member.permissions.has('BAN_MEMBERS')) return i.reply({embeds: [new MessageEmbed().setDescription(`<:greycross:907281080275599401> You need the \`BAN_MEMBERS\` permission to use this command.`).setColor('RED')], ephemeral: true})
            await member.ban({reason})
            const embed1 = new MessageEmbed().setColor('RANDOM').setDescription(`<:greyban:917264001170288711> Successfully banned ${member.toString()} for \`${reason}\``)
            try {
                
                i.update({embeds: [embed1]})
            } catch (error) {
                console.log(error)
            }
        } else if (i.customId === 'mute') {
            if (!interaction.member.permissions.has('MODERATE_MEMBERS')) return i.reply({embeds: [new MessageEmbed({color:'RANDOM', description: '<:greycross:907281080275599401> You need the `MODERATE_MEMBERS` permission to use this command.'})], ephemeral: true})
            if(member.isCommunicationDisabled() == true){
    console.log(member.isCommunicationDisabled())
    return i.reply({embeds: [new MessageEmbed({color: 'RANDOM', description: '<:greycross:907281080275599401> The user is already timed-out'})], ephemeral: true})
}
console.log(member.isCommunicationDisabled())
try {
                
    await member.timeout(1000 * 10,reason)
} catch (error) {
    console.log(error)
}
const embed2 = new MessageEmbed().setColor('RANDOM').setDescription(`<:micmute:917894234298777690> Successfully timed-out ${member.toString()} for 10 seconds due to \`${reason}\``)
try {
                
    i.update({embeds: [embed2]})
} catch (error) {
    console.log(error)
}
        } else if (i.customId === 'unmute') {
            if (!interaction.member.permissions.has('MODERATE_MEMBERS')) return i.reply({embeds: [new MessageEmbed({color:'RANDOM', description: '<:greycross:907281080275599401> You need the `MODERATE_MEMBERS` permission to use this command.'})], ephemeral: true})
            if(member.isCommunicationDisabled() == false){
            
                return i.reply({embeds: [new MessageEmbed({color: 'RANDOM', description: `<:greycross:907281080275599401> The user is'nt timed-out`})], ephemeral: true})
            }
            try {
                
                await member.timeout(null,reason)
            } catch (error) {
                console.log(error)
            }
const embed2 = new MessageEmbed().setColor('RANDOM').setDescription(`<:micmute:917894234298777690>  removed timed-out from ${member.toString()} due to \`${reason}\``)
try {
                
    i.update({embeds: [embed2]})
} catch (error) {
    console.log(error)
}
        }
 else if (i.customId === 'warn') {
            if (!interaction.member.permissions.has('MODERATE_MEMBERS')) return i.reply({embeds: [new MessageEmbed({color:'RANDOM', description: '<:greycross:907281080275599401> You need the `MODERATE_MEMBERS` permission to use this command.'})], ephemeral: true})
        
const embed2 = new MessageEmbed().setColor('RANDOM').setDescription(`<:micmute:917894234298777690> Added warning to ${member.toString()} due to \`${reason}\``)
try {
    i.update({embeds: [embed2]})
                
} catch (error) {
    console.log(error)
}
        }
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