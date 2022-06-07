import { AudioResource, createAudioResource } from "@discordjs/voice";
import { GuildMember } from "discord.js";
import {stream, video_info, YouTubeVideo} from 'play-dl'

export class Song{
    url: string
    requester: GuildMember
    constructor(url: string, requester: GuildMember){
        this.url = url;
        this.requester = requester;
    }

    async getSongInfo(): Promise<SongInfo>{
        const info: YouTubeVideo = (await video_info(this.url)).video_details
        const songInfo: SongInfo = {
            title: info.title || "Unknow Title",
            thumbnail: info.thumbnails[0].url,
            duration: info.durationInSec
        }

        return songInfo
    }


    async getAudioResource(): Promise<AudioResource>{
        let audioStream = await stream(this.url)
        let audio: AudioResource = createAudioResource(audioStream.stream, {
            inputType: audioStream.type,
            inlineVolume: true
        })
        audio.volume?.setVolume(0.1)

        return audio
    }
}


export interface SongInfo{
    title: string,
    thumbnail: string,
    duration: number,
}



