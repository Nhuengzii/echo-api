import { Snowflake } from "discord.js";
import { SongQueue } from "./libs/SongQueue";


export class QueueManager{
    private static _instance: QueueManager | undefined;
    public songQueueList: {[guildId: Snowflake]: SongQueue} = {}
    constructor(){

    }

    public static Instance(): QueueManager{
        if(this._instance == undefined){
            return new QueueManager()
        }
        return this._instance
    }
   
}
