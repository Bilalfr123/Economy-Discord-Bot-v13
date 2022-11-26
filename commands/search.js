const { MessageEmbed } = require('discord.js');
const profileModel = require ( '../models/profileSchema')
module.exports={
    category:'Fun',
    description:'Displays bal information',
    Permissions:['ADMINISTRATOR'],
// slash:'both',
    testOnly:true,
    callback:async({message,})=>{
        // const location = [
        //     "car",
        //     "bathroom",
        //     "park",
        //     "truck",
        //     "pocket",
        //     "computer"
        // ];

        // const chosenLocations = location.sort(() => Math.random() - Math.random()).slice(0, 3);

        // // const filter = ({ author, content }) => m.author == author && chosenLocations.some((location) => location.toLowerCase() == content.toLowerCase());

        // message.channel.send(`<@${message.author.id}> Which location would you like to search?\n Type the location in this channel\n \`${chosenLocations.join('` `')}\``);
        // const collector = message.channel.createMessageCollector( { max: 1, time: 25000 });

        // const earnings = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
        
        
        
        
        //         collector.on('collect', async (m) => {
        //             if(message.author.id === m.author.id){

        //                 message.channel.send(`You found ${earnings} coins!`);
            
        //                 await profileModel.findOneAndUpdate(
        //                     {
        //                         userID: message.author.id,
        //                     },
        //                     {
        //                         $inc: {
        //                             coins: earnings,
        //                         },
        //                     }
        //                 );
        //             }
        //             else{
        //                 message.channel.send('hi')
        //             }
        //         });
        //         collector.on('end', (collected) => {
                   
        //                 message.channel.send('You ran out of time!');
                 
        //         });
        //         // collector.on('end', (collected, reason) => {
        //         //     if (reason == "time") {
        //         //         message.channel.send('You ran out of time!');
        //         //     }
        //         // });


        const LOCATIONS = [
            "car",
            "sock",
            "milk",
            "wallet",
            "box",
            "pocket",
            "bus",
            "gutters",
            "park",
            "train",
            "lounge",
            "keyboard",
            "picnic",
            "bathroom",
            "bed",
            "sofa",
            "backpack",
            "laptop",
            "oculus",
            "shirt",
            "step mom house",
          ];
      
          let chosenLocations = LOCATIONS.sort(() => Math.random() - Math.random()).slice(0, 3);
      
          const RANDOM_NUMBER = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
      console.log(RANDOM_NUMBER)
          const FILTER = (m) => {
            return chosenLocations.some((answer) => answer.toLowerCase() === m.content.toLowerCase()) && m.author.id === message.author.id;
          };
      
          const COLLECTOR = message.channel.createMessageCollector(FILTER, { max: 1, time: 15000 });
      
          COLLECTOR.on("collect", async (m) => {
            // const EMBED = new MessageEmbed()
            //   .setColor("#ffa500")
            //   .setTitle(`${message.author.username} searched a ${m.content} 🕵️`)
            //   .setDescription(`You found ${RANDOM_NUMBER.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`)
            //   .setFooter(`A true detective you are.`);
            message.channel.send('hi');

            // client.add(message.author.id, RANDOM_NUMBER)
            // await profileModel.findOneAndUpdate(
            //                         {
            //                             userID: message.author.id,
            //                         },
            //                         {
            //                             $inc: {
            //                                 coins: RANDOM_NUMBER,
            //                             },
            //                         }
            //                     );
          });
      
 
      
          COLLECTOR.on("end", (collected) => {
            if (collected.size == 0) {
              return message.channel.send(
                `What are you doing <@${message.author.id}>?! There was ${RANDOM_NUMBER.toString().replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                )} hidden inside the ${chosenLocations[0]} :sob:`
              );
            }
        });
          message.channel.send(
            `<@${
              message.author.id
            }>\n**Which location would you like to search?** :mag:\nType the location in this channel.\n\`${chosenLocations.join("` `")}\``
          );
        },


    
    }