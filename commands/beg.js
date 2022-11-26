const profileModel = require ( '../models/profileSchema')
module.exports={
    category:'Fun',
    description:'Displays bal information',
    // Permissions:['ADMINISTRATOR'],
// slash:'both',
    testOnly:true,
    callback:async({message})=>{
      let jobs = [
        'jospital','work','house','toilet','poop'
      ]
      const curJob = jobs[Math.round(Math.random() * jobs.length) - 1]
        const randomNumber = Math.floor(Math.random() * 500) + 1;
        const response = await profileModel.findOneAndUpdate(
          {
            userID: message.author.id,
          },
          {
            $inc: {
              coins: randomNumber,
            },
          }
        );
         message.channel.send(`${message.author.username}, you begged ${curJob} and received ${randomNumber} **coins**`);

    }
}