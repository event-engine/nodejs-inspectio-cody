import {camelize} from "tslint/lib/utils";
import {Node} from "../board/graph";

export const nodeNameToCamelCase = (node: Node | string): string => {
    const nodeName = typeof node === 'string'? node : node.getName();

    const name = camelize(nodeName.split(' ').join('-'));
    return name.charAt(0).toLowerCase() + name.slice(1);
}

export const nodeNameToPascalCase = (node: Node | string): string => {
    const nodeName = typeof node === 'string'? node : node.getName();

    const name = camelize(nodeName.split(' ').join('-'));
    return name.charAt(0).toUpperCase() + name.slice(1);
}

export const nodeNameToSnakeCase = (node: Node | string): string => {
    const nodeName = typeof node === 'string'? node : node.getName();

    if(nodeName === '') {
        return '';
    }

    let name = nodeName.split(' ').join('_').split('-').join('_');
    name = name[0].toLowerCase() + name.slice(1).replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    return name.split('__').join('_');
}
