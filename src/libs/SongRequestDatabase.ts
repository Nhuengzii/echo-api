import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import { SongInfo } from './Song';




async function saveSongRequest(songRequestDB: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>, songInfo: SongInfo, isCancel: boolean){

    const data: SongRequestData = {
        title: songInfo.title,
        guildId: songInfo.requester.guild.id,
        youtubeId: songInfo.youtubeId,
        isCancel: isCancel,
        userId: songInfo.requester.user.id
    }

    await songRequestDB.add(data)
}


interface SongRequestData{
    guildId: string,
    userId: string,
    title: string,
    youtubeId: string,
    isCancel: boolean
}

export {SongRequestData, saveSongRequest}
