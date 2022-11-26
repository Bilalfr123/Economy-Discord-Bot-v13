
module.exports = (client) =>{
    client.on('messageCreate' , async message =>{
      
        console.log('1')
        // if (message.channel.type != 'text' || message.author.bot){
        //     return
        // }
        console.log('3')
    
      if (message.guild.id !== '942684836341112842' && message.channel.id == '945921263472353283'){
        let channel = client.channels.cache.get('945921263472353283'); // gets the message from this channel
    console.log('2')
    
            const marketnews = client.channels.cache.get('943012224472072242'); //sends it to this text channel
            marketnews.send(message);
            return
      }
        })
    }
