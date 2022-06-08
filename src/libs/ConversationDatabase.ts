import { Snowflake } from 'discord.js';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import { SongInfo } from './Song';
import {conversationDB} from '../Bot'


async function getConversationDatas(userId: Snowflake,limit: number = 100): Promise<IConversationData[]> {

    const querry = conversationDB.where('userId', '==', userId).limit(limit)
    const sorted = querry.orderBy('createdAt', 'asc').limit(limit)
    const snapShot = await sorted.get();
    if(snapShot.empty){
        console.log("it's empty")
        return []
    }
    
    const conversationDatas: IConversationData[] = []

    snapShot.forEach(doc => {
        const data = doc.data()

        const conversationData: IConversationData = {
            createdAt: data.createdAt,
            userId: data.userId,
            inputRaw: data.inputRaw,
            outputRaw: data.outputRaw,
            inputTranslate: data.inputTranslate,
            outputTranslate: data.outputTranslate,
            guildId: data.guildId,
        }

        conversationDatas.push(conversationData)
    })


    return conversationDatas
}

async function saveConversationData(conversationData: IConversationData) {
    await conversationDB.add(conversationData)
}   




interface IConversationData{
    createdAt: Date,
    guildId: Snowflake,
    userId: Snowflake,
    inputRaw: string,
    inputTranslate: string,
    outputRaw: string,
    outputTranslate: string
}

export {IConversationData, getConversationDatas, saveConversationData}