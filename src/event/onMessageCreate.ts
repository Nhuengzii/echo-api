import { Client, CommandInteraction } from "discord.js";




module.exports =  (client: Client): void => {
    client.on('messageCreate', async (message) => {
        if(!message.content.startsWith('-')) return
        
        const commandName: string = message.content.split(' ', 1)[0]

        switch(commandName){
            case "-join" || "j":
                await require('../commands/join')(client, message.member, message)
                break;

            default:
                return;
        }
        

        
    })
}