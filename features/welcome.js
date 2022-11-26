const { MessageEmbed, MessageAttachment,DiscordJS } = require("discord.js")
const Canvas = require('canvas');
const welcomeData ={}
module.exports = (client) =>{
    client.on('guildMemberAdd' , async member =>{
const {guild,id} = member
console.log('start')
if(!member.guild) return;
console.log('start1')
const canvas = Canvas.createCanvas(1772, 633)
const ctx = canvas.getContext('2d')
const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/946299117225799720/959450231659966474/images_1_27.jpeg')
ctx.drawImage(background, 0 , 0, canvas.width, canvas.height)
ctx.strokeStyle = '#f2f2f2'
ctx.strokeRect(0, 0 , canvas.width, canvas.height)
var text1 = `${member.user.username}`
var text2 = `#${member.user.discriminator}`
var text3 = `Member #${member.guild.memberCount}`
var text3 = `You are our ${member.guild.memberCount}th member!`
var text4 = `Welcome to ${member.guild.name}`
if(text1.length >= 14) {
  ctx.font = 'bold 100px Sans-Serif'
  ctx.fillStyle = '#f2f2f2'
  ctx.fillText(text1, 720, canvas.height / 2 +20)
}
else {
  ctx.font = 'bold 150px Sans-Serif'
  ctx.fillStyle = '#f2f2f2'
  ctx.fillText(text1, 720, canvas.height / 2 + 20)
}

ctx.font = 'bold 40px Sans-Serif'
ctx.fillStyle = '#f2f2f2'
ctx.fillText(text2, 730, canvas.height / 2 + 58)

ctx.font = 'bold 60px Sans-Serif'
ctx.fillStyle = '#f2f2f2'
ctx.fillText(text3, 750, canvas.height / 2 + 135)

ctx.font = 'bold 60px Sans-Serif'
ctx.fillStyle = '#f2f2f2'
ctx.fillText(text4, 700, canvas.height / 2 - 150)

ctx.beginPath()
ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true)
ctx.closePath()
ctx.clip()
const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: 'jpg'}))
ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500)
const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png')
let data = welcomeData[guild.id] //fetch data from local memory
const text = `Hey <@${member.user.id}>, Welcome to ${guild.name}.Please make sure to look at the pinned message.Have a great time!`
const channelID = '946016167338836102'
const channel = guild.channels.cache.get(channelID) 
data = welcomeData[guild.id] = [channel,text] //fetch data from local memory

console.log('hereS')
data[0].send({
    content:data[1],
    allowedMentions:{
    },
    files:
  [attachment]
})
    })
}