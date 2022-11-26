const profileModel = require ( '../models/profileSchema')
const file = require('../commands/review1')
module.exports = (client) =>{
    client.on('messageCreate' , async message =>{
    
        // let prefix = `!`
        // if (!message.content.startsWith(prefix) || message.author.bot) return;
        if (message.author.bot) return;

        let profileData;
        // let userData;
        try {
          profileData = await profileModel.findOne({ userID: message.author.id });
          // userData = await user.findOne({ userID: message.author.id });
          if (!profileData) {
            let profile = await profileModel.create({
              userID: message.author.id,
              serverID: message.guild.id,
              coins: 1000,
              bank: 0,
            });
            profile.save();
          }
          // if (!userData) {
          //   let userD = await user.create({
          //     userID: message.author.id,
          //     date: new Date(),
          //   });
          //   userD.save();
          // }
        } catch (err) {
          console.log(err);
        }
    })
}