import { getVoiceConnection, VoiceConnection } from "@discordjs/voice";
import { Client, GuildMember, MessageEmbed, TextChannel } from "discord.js";
import {video_basic_info, search} from 'play-dl'
import { Song, SongInfo } from "../libs/Song";
import { SongQueue } from "../libs/SongQueue";
import { QueueManager } from "../QueueManager";
module.exports = async (client: Client, requester: GuildMember, querry: string, textChannel: TextChannel | undefined): Promise<void> => {

    if(!requester.voice){
        if(textChannel != undefined){
            await textChannel.send({content: 'You must in voice channel before request music'})
            return
        }
    }

    const voiceConnection: VoiceConnection | undefined = getVoiceConnection(requester.guild.id)
    if(!voiceConnection){
        if(textChannel != undefined){
            await textChannel.send({content: 'Bot is not in any voice channel! Please type -j or -join'})
            return
        }
        return
    }


    let url: string = "";
    if(!querry.startsWith("https://")){

        const searchResult = await search(querry, {
            limit: 1
        })
        url = searchResult[0].url;
    }
    else{
        url = querry;
    }

    const queueManager = QueueManager
    const songQueueList = queueManager.Instance().songQueueList
    if(!songQueueList[requester.guild.id]){
        songQueueList[requester.guild.id] = new SongQueue(requester.guild.id, voiceConnection)
    }
    const songQueue = songQueueList[requester.guild.id]


    const song: Song = new Song(url, requester)
    await songQueue.addSong(song)
    

    if(!textChannel) return;

    const songInfo: SongInfo = await song.getSongInfo()
    const replyEmbed = new MessageEmbed()
        .setTitle(songInfo.title)
        .setThumbnail(songInfo.thumbnail)
        .setFooter({text: `Request by ${requester.displayName}`, iconURL: requester.avatarURL() || "https://preview.redd.it/b07ddk0lj2q41.png?width=654&format=png&auto=webp&s=c739b0f12ece1458871efabb1fa0d2c54b489892"})
    await textChannel.send({embeds: [replyEmbed]})








}