import { Client, Intents, Snowflake } from "discord.js"
import { SongQueue } from "./libs/SongQueue"
import {addSpeechEvent, resolveSpeechWithWitai} from "discord-speech-recognition"
import {config} from "dotenv"
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import { SongInfo } from './libs/Song';



//Setup discord client
config()
const token = process.env.TOKEN

const client: Client = new Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
})

export type QueueManager = {[guildId: string]: SongQueue}
const queueManager: QueueManager = {}
export {queueManager}

// set up databasse
const firebaseConfig = {
    apiKey: "AIzaSyDs0_yOFtBuMN95IbQOWN8lJ5n4WtalfUA",
    authDomain: "echo-a449b.firebaseapp.com",
    projectId: "echo-a449b",
    storageBucket: "echo-a449b.appspot.com",
    messagingSenderId: "128837416050",
    appId: "1:128837416050:web:d03f9b8bfa6f505e657eeb",
    measurementId: "G-2LNJG32VLL"
  };
firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore();
const songRequestDB = firestore.collection("SongRequest")
const conversationDB = firestore.collection("Conversation")

export {firebase, songRequestDB, conversationDB}


//setup event
require('./event/ready')(client)
require('./event/onMessageCreate')(client)
require('./event/speech')(client)


// login
client.login(token)

