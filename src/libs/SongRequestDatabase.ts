import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import { SongInfo } from './Song';




async function saveSongRequest(songRequestDB: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>, songInfo: SongInfo, isCancel: boolean, playbackDuration: number){

    const data: SongRequestData = {
        title: songInfo.title,
        guildId: songInfo.requester.guild.id,
        youtubeId: songInfo.youtubeId,
        isCancel: isCancel,
        userId: songInfo.requester.user.id,
        playbackDuration: playbackDuration
    }

    await songRequestDB.add(data)
}


interface SongRequestData{
    guildId: string,
    userId: string,
    title: string,
    youtubeId: string,
    isCancel: boolean,
    playbackDuration: number
}

export {SongRequestData, saveSongRequest}
