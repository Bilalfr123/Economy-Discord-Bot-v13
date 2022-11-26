//     const embed1 = new MessageEmbed().setColor('YELLOW').setAuthor({
//         name:`${name}`,
//         iconURL:`${avatar}`
//     })
//     .setFooter({
//        text:`${footer}`,
//         iconURL:`${guildIcon}`
//     }).addField(`${product}`,`${review}`, false)
//     .addField('**Reply from staff**',`${message.content}`, false)
//     .setTimestamp()
//     const components1 = 
//     (state) => [
//         new MessageActionRow().addComponents(
//             new MessageButton().setCustomId(customid).setStyle(style).setLabel(label).setDisabled(state),
         
//         )
//     ]
// await message.channel.send({
//     embeds:[embed1],
//     components:components1(false)
// })

// let customid = interaction.message.components[0].components[0].customId
// let label = interaction.message.components[0].components[0].label
// let style = interaction.message.components[0].components[0].style
// let name= interaction.message.embeds[0].author.name
// let avatar= interaction.message.embeds[0].author.iconURL
// let footer= interaction.message.embeds[0].footer.text
// let guildIcon= interaction.message.embeds[0].footer.iconURL
// let product= interaction.message.embeds[0].fields[0].value
// let review= interaction.message.embeds[0].fields[0].name
