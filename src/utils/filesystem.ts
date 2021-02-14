import * as fs from 'fs';
import {MakeDirectoryOptions, WriteFileOptions} from 'fs';
import {CodyResponse, CodyResponseType} from "../general/response";

export const mkdirIfNotExistsSync = (path: string, options?: number | string | MakeDirectoryOptions | null): CodyResponse | null => {
    try {
        if(!fs.existsSync(path)) {
            fs.mkdirSync(path, options);
        }
    } catch (e) {
        return {
            cody: `I tried to create the directory "${path}", but something went wrong :(`,
            details: e.toString(),
            type: CodyResponseType.Error
        }
    }

    return null;
}

export const writeFileSync = (file: string, content: string, options?: WriteFileOptions): CodyResponse | null => {
    try {
        fs.writeFileSync(file, content, options);
    } catch (e) {
        console.error("Failed to write file: ", file, "with content: ", content);
        console.error(e);
        return {
            cody: "Oh that's not good. Something went wrong with the filesystem!",
            details: e.toString(),
            type: CodyResponseType.Error
        };
    }

    return null;
}
