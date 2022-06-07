import { Client, GuildMember, Message } from "discord.js";
import {joinVoiceChannel, getVoiceConnection, VoiceConnectionStatus} from "@discordjs/voice"
import { queueManager } from "../Bot";


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

    voiceConnection.on(VoiceConnectionStatus.Disconnected, () => {
        console.log("Bot disconnected!")
        const voiceConnection = getVoiceConnection(requester.guild.id)
        voiceConnection?.destroy()
        if(queueManager[requester.guild.id]){
            delete queueManager[requester.guild.id]
            console.log("Queue destroyed")
        }
    })

    if((message != undefined) && (voiceConnection)){
        await message.channel.send({content: `I'm joined ${requester.voice.channel.name} channel!`})
        return
    }
    return

    

}