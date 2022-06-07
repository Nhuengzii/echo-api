import { AudioPlayer, AudioResource, createAudioPlayer, getVoiceConnection, NoSubscriberBehavior, VoiceConnection, AudioPlayerState, AudioPlayerStatus } from "@discordjs/voice";
import { Snowflake, MessageEmbed } from "discord.js";
import { Song, SongInfo } from "./Song";

export class SongQueue{
    guildId: Snowflake;
    audioPlayer: AudioPlayer
    songList: Song[] = []
    pointer: number = 0
    voiceConnection: VoiceConnection;
    constructor (guildId: Snowflake, voiceConnection: VoiceConnection) {
        this.guildId = guildId
        this.audioPlayer = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause
            }
        })
        this.voiceConnection = voiceConnection
        this.voiceConnection.subscribe(this.audioPlayer)
    }

    async addSong(song: Song){
        this.songList.push(song)
        if(this.audioPlayer.state.status == AudioPlayerStatus.Idle) {await this.playSong()}
    }

    async playSong(){
        const audioResource: AudioResource = await this.getCurrentSong().getAudioResource()
        this.audioPlayer.play(audioResource)
    }

    getCurrentSong(): Song{
        let currentSong = this.songList[this.pointer]
        return currentSong
    }
}

