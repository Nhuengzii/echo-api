import { AudioPlayer, AudioResource, createAudioPlayer, getVoiceConnection, NoSubscriberBehavior, VoiceConnection, AudioPlayerState, AudioPlayerStatus } from "@discordjs/voice";
import { Snowflake, MessageEmbed, TextChannel } from "discord.js";
import { Song, SongInfo } from "./Song";

export class SongQueue{
    guildId: Snowflake;
    audioPlayer: AudioPlayer | undefined
    songList: Song[] = []
    pointer: number = 0
    voiceConnection: VoiceConnection;
    constructor (guildId: Snowflake, voiceConnection: VoiceConnection) {
        this.guildId = guildId
        this.voiceConnection = voiceConnection
    }

    async addSong(song: Song){
        this.songList.push(song)
        if(!this.audioPlayer) 
        {await this.playSong()}
    }

    async playSong(){
        const audioResource: AudioResource = await this.getCurrentSong().getAudioResource()
        this.audioPlayer = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause
            }
        })
        this.voiceConnection.subscribe(this.audioPlayer)
        this.audioPlayer.play(audioResource)

        this.audioPlayer.on(AudioPlayerStatus.Idle, async () => {
            // console.log(`Current pointer is ${this.pointer} of list lenght ${this.songList.length}`)
            console.log('song ended')
            await this.nextSong()
        })
    }

    async nextSong(){
        this.pointer += 1;
        if(this.pointer >= (this.songList.length)){
            this.audioPlayer = undefined;
            console.log("Queue End")
            return
        }
        else{
            await this.playSong()
            return
        }
    }

    getCurrentSong(): Song{
        let currentSong = this.songList[this.pointer]
        return currentSong
    }

    async showQueue(textChannel: TextChannel): Promise<void>{
        const embed = new MessageEmbed()

        for(let i: number = 0; i < this.songList.length; i++){
            const info = await this.songList[i].getSongInfo()
            if(i == this.pointer){
                embed.addField(`--> ${i}. ** ${info.title} **`, `------------------------------`, false)
                embed.setThumbnail(info.thumbnail)
            }
            else{
                embed.addField(`${i}. ${info.title}`,`------------------------------` , false)
            }
        }
        await textChannel.send({embeds: [embed]})

    }
}

