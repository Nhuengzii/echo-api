import { addSpeechEvent, resolveSpeechWithWitai, VoiceMessage } from "discord-speech-recognition";
import { Client } from "discord.js";

module.exports = async (client: Client) => {
    addSpeechEvent(client, {lang: 'th-TH'})

    client.on('speech', async (voicemessage: VoiceMessage) => {
        if(!voicemessage.content) return;
        if(voicemessage.content.length == 0) return;

        console.log(`${voicemessage.member?.user.username} said: ${voicemessage.content}`)
    })
}