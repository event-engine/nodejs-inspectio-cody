import {Node} from "../board/graph";
import {CodyResponse, CodyResponseType} from "../general/response";

export const parseJsonMetadata = <T>(node: Node): [T | null, CodyResponse | undefined] => {
    const [meta, err] = getStringMetadata(node);

    if(err) {
        return [null, err];
    }

    try {
        return [JSON.parse(meta as string), undefined];
    } catch (e) {
        return [null, {
            cody: `I was not able to parse metadata of "${node.getName()}". It's not valid JSON, is it?`,
            details: e.toString(),
            type: CodyResponseType.Error
        }]
    }
}

export const getStringMetadata = (node: Node): [string | null, CodyResponse | undefined] => {
    if(node.getMetadata() === null) {
        return [null, {
            cody: `Element "${node.getName()}" is missing metadata. Can't proceed without it!`,
            type: CodyResponseType.Error
        }]
    }

    return [node.getMetadata(), undefined];
}
