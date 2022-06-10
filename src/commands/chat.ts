import { Client, Guild, GuildMember, Snowflake, TextChannel } from "discord.js";
import { config } from "dotenv";
import { getConversationDatas, IConversationData, saveConversationData } from "../libs/ConversationDatabase"
import {queueManager} from "../Bot"
import {Configuration, OpenAIApi} from 'openai'
import { SongQueue } from "../libs/SongQueue";
import { getVoiceConnection } from "@discordjs/voice";
const Translator = require('translate')
Translator.key = "AIzaSyCC4NjNuhOP-_K3pZtMnbQoawoyAzYjYkU"




//SetUp OpenAi
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);



config()

module.exports = async (client: Client, guildId: string, userMember: GuildMember, inputRaw: string, textChannel: TextChannel | undefined) => {
    const conversationDatas: IConversationData[] = await getConversationDatas(userMember.id, 100)
    let prompt = conversationDataToPrompt(conversationDatas)

    const inputTranslate: string = await Translator(inputRaw, {from: 'th', to: 'en'})
    prompt += `Human: ${inputTranslate}\nBot: `

    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 60,
        top_p: 0.3,
        frequency_penalty: 0.5,
        presence_penalty: 0,
        stop: ["Bot:", "Human:"],
    });

    let outputRaw: string = "ERRRRRO"
    let respChoices = response.data.choices
    if (respChoices)
    {
        outputRaw = respChoices[0].text || "Tell Nhueng that Me Error"
        outputRaw = outputRaw.trim()
    }
    const outputTranslate = await Translator(outputRaw, {from: 'en', to: 'th'})

    textChannel?.send(outputTranslate)
  

    let speechText = outputTranslate
    if(textChannel) {speechText = `คุณ ${userMember.displayName} ถามว่า${inputRaw}  ฉันขอตอบว่า${outputTranslate}`}
    if(queueManager[guildId]){
        const songQueue = queueManager[guildId]
        songQueue.addNotification(speechText)
    }
    else{
        const voiceConnection = getVoiceConnection(guildId)
        if(!voiceConnection){console.log("no voice connection in Chat.ts"); return;}
        queueManager[guildId] = new SongQueue(guildId, voiceConnection)
        const songQueue = queueManager[guildId]
        songQueue.addNotification(speechText)
    }


    const conversationData: IConversationData = {
        createdAt: (new Date()),
        guildId: guildId,
        userId: userMember.id,
        inputRaw: inputRaw,
        inputTranslate: inputTranslate,
        outputRaw: outputRaw,
        outputTranslate: outputTranslate,
    }

    await saveConversationData(conversationData)

}


function conversationDataToPrompt(conversationDatas: IConversationData[]): string {
    let prompt = "The following is a conversation with an AI assistant. Her name is Echo.The person who created her was Nhueng. Echo is helpful, creative, clever, and very friendly.\n\n"
    for(let i = 0; i < conversationDatas.length; i++){
        const conversationData: IConversationData = conversationDatas[i]
        prompt += `Human: ${conversationData.inputTranslate}\nBot: ${conversationData.outputRaw}\n`
    }
    return prompt
}