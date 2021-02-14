import {CodyResponse, CodyResponseType} from "./response";

export const greeting = (user: string): CodyResponse => {
    return {
        cody: `Hey ${user}, Cody here. How can I help you?`,
        details: ["If you need guidance just ask me with: %c/help", 'background-color: rgba(251, 159, 75, 0.2)'],
        type: CodyResponseType.Info,
    }
}

export interface IioSaidHello {
    user: string;
}
