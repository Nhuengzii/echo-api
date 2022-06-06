import { Client, GuildMember, Message } from "discord.js";
import {joinVoiceChannel, getVoiceConnection} from "@discordjs/voice"


module.exports = async (client: Client, requester: GuildMember, message: Message | undefined): Promise<void> => {

    if(!requester.voice.channel){
        if(message != undefined){await message.channel.send({content: "You are not in any voice channel!"})}
        return 
    }

    if(getVoiceConnection(requester.guild.id)){
        if(message != undefined){await message.channel.send({content: "I'm already in voice channel!"})}
        return
    }

    const voiceConnection = joinVoiceChannel({
        guildId: requester.guild.id,
        channelId: requester.voice.channel.id,
        adapterCreator: requester.guild.voiceAdapterCreator
    })

    if((message != undefined) && (voiceConnection)){
        await message.channel.send({content: `I'm joined ${requester.voice.channel.name} channel!`})
        return
    }
    return

    

}