import {CodyResponse, CodyResponseType, ReplyCallback} from "./response";

let CurrentQuestion: ReplyCallback | undefined;

export interface Reply {
    reply: any;
}

export const checkQuestion = (res: CodyResponse): CodyResponse => {
    if(res.type === CodyResponseType.Question && res.reply) {
        CurrentQuestion = res.reply;
    }

    return res;
}

export const handleReply = async (reply: any): Promise<CodyResponse> => {
    if(CurrentQuestion) {
        const res = await CurrentQuestion(reply);
        CurrentQuestion = undefined;
        return res;
    }

    return {
        cody: "Sorry, not sure what to say.",
        details: "Did I ask anything?",
        type: CodyResponseType.Warning
    }
}


export const test = (): CodyResponse => {
    return {
        cody: "Do you like bots?",
        details: "Answer with: Yes|no",
        type: CodyResponseType.Question,
        reply: async (yes: string): Promise<CodyResponse> => {
            console.log("Replied with: ", yes);

            return {
                cody:  yes !== 'no'? "Cool! I like you, too" : "Oh ok, maybe I can convince you that bots are awesome.",
                details: yes !== 'no'? ":cody_dance:" : ":tears:",
                type: CodyResponseType.Info
            }
        }
    }
}
