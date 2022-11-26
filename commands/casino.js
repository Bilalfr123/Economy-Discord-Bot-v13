const profileModel = require ( '../models/profileSchema')
module.exports={
    category:'Fun',
    description:'Displays bal information',
    cooldown:'1h',
    minArgs:2,
    maxArgs:2,
    expectedArgs:'<mode> <amount> ',
    testOnly:true,
    callback:async({message,args})=>{
        let profileData = await profileModel.findOne({ userID: message.author.id });
        var abc =[]
        const val = Math.floor(parseInt(args[1]))
        if (isNaN(val) || !val) {
            message.channel.send(":x: Bitte gib einen gultigen Wert an")
            return
        } 
        if (val > profileData.coins){
            message.channel.send(`You don't have that amount of coins to bid`)
            return
        }  
        const modes = [
            "easy",
            "medium",
            "hard",
            "legend"
        ]
        const mode = args[0] ? args[0].toLocaleLowerCase() : undefined
        if (!mode || !modes.includes(mode)) {
            message.channel.send(`:x: Bitte gib einen Modus an: ${modes.map(e => `\`${e}\``).join(", ")}`) 
            return
        }
     
	if (val < 500) {
        message.channel.send(":x: Du musst midestens 500 Coins investieren")
        return
    }
    if (val % 1 != 0 || val <= 0) {
        message.channel.send("Given amount must be a whole number");
        return
    } 
    if (mode == "easy") {
        var min = 1;
        var max = 3;
        var x = Math.round((Math.random() * (max - min)) + min);
        console.log(x)
        if(x == 1){
            await profileModel.findOneAndUpdate(
                {
                  userID: message.author.id,
                },
                {
                  $inc: {
                    coins: val/2,
                  },
                }
              );
        
            message.channel.send(`you won ${val/2}`)
        }else{
            await profileModel.findOneAndUpdate(
                {
                  userID: message.author.id,
                },
                {
                  $inc: {
                    coins: -val/2,
                  },
                }
              );
        
            message.channel.send(`you lost ${val/2}`)
        }
    }
    if (mode == "medium") {
        var min = 1;
        var max = 10;
        var x = Math.round((Math.random() * (max - min)) + min);
        console.log(x)

        if(x == 5){
            await profileModel.findOneAndUpdate(
                {
                  userID: message.author.id,
                },
                {
                  $inc: {
                    coins: val*2,
                  },
                }
              );
        
            message.channel.send(`you won ${val*2}`)
        }else{
            await profileModel.findOneAndUpdate(
                {
                  userID: message.author.id,
                },
                {
                  $inc: {
                    coins: -val*2,
                  },
                }
              );
        
            message.channel.send(`you lost ${val/2}`)
        }
    }
    if (mode == "hard") {
        var min = 1;
        var max = 50;
        var x = Math.round((Math.random() * (max - min)) + min);
        if(x == 25){
            await profileModel.findOneAndUpdate(
                {
                  userID: message.author.id,
                },
                {
                  $inc: {
                    coins: val*3,
                  },
                }
              );
        
            message.channel.send(`you won ${val*3}`)
        }else{
            await profileModel.findOneAndUpdate(
                {
                  userID: message.author.id,
                },
                {
                  $inc: {
                    coins: -val*3,
                  },
                }
              );
        
            message.channel.send(`you lost ${val/2}`)
        }
    }
    if (mode == "legend") {
        var min = 1;
        var max = 100;
        var x = Math.round((Math.random() * (max - min)) + min);
        if(x == 50){
            await profileModel.findOneAndUpdate(
                {
                  userID: message.author.id,
                },
                {
                  $inc: {
                    coins: val*5,
                  },
                }
              );
        
            message.channel.send(`you won ${val*5}`)
        }
        else{
            await profileModel.findOneAndUpdate(
                {
                  userID: message.author.id,
                },
                {
                  $inc: {
                    coins: -val*5,
                  },
                }
              );
        
            message.channel.send(`you lost ${val/2}`)
        }
    }

            }
    }