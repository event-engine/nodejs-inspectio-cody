import {Node, NodeType} from "../board/graph";
import {CodyResponse, CodyResponseType} from "../general/response";
import {List} from "immutable";

type Success = Node;
type Error = CodyResponse;

export const getSingleTarget = (node: Node, expectedType: NodeType): Success | Error => {
    const targets = node.getTargets().filter(t => t.getType() === expectedType);

    if(targets.count() === 0) {
        return {
            cody: `Looking for a "${expectedType}" as a target of "${node.getName()}", but there is non connected.`,
            details: `Check your design. Cannot proceed without a ${expectedType}`,
            type: CodyResponseType.Error
        };
    }

    if(targets.count() > 1) {
        return {
            cody: `Looking for a single "${expectedType}" as a target of "${node.getName()}", but there are multiple connected.`,
            details: `Not sure what you've planned? But I cannot handle it this way, sorry.`,
            type: CodyResponseType.Error
        };
    }

    return node.getTargets().first();
}

export const getSingleSource = (node: Node, expectedType: NodeType): Success | Error => {
    const sources = node.getSources().filter(t => t.getType() === expectedType);

    if(sources.count() === 0) {
        return {
            cody: `Looking for a "${expectedType}" as a source of "${node.getName()}", but there is non connected.`,
            details: `I'd love to, but I cannot proceed without a ${expectedType}`,
            type: CodyResponseType.Error
        };
    }

    if(sources.count() > 1) {
        return {
            cody: `Looking for a single "${expectedType}" as a source of "${node.getName()}", but there are multiple connected.`,
            details: `You could teach me to handle the situation. But at the moment I can't, sorry.`,
            type: CodyResponseType.Error
        };
    }

    return sources.first();
}

export const getSourcesOfType = (node: Node, expectedType: NodeType, ignoreOthers: boolean = false, includeChildren: boolean = false, allowEmpty: boolean = false): List<Success> | Error => {
    let sources = node.getSources().filter(t => t.getType() === expectedType);

    if(sources.count() !== node.getSources().count() && !ignoreOthers) {
        return {
            cody: `Only "${expectedType}" is a valid source for "${node.getName()}", but there seem to be other card types connected.`,
            details: `You might have a second look at it?`,
            type: CodyResponseType.Error
        };
    }

    if(includeChildren) {
        node.getChildren().forEach(child => {
            sources = sources.push(...child.getSources().filter(t => t.getType() === expectedType));
        })
    }

    if(sources.count() === 0 && !allowEmpty) {
        return {
            cody: `Looking for a "${expectedType}" as a source of "${node.getName()}", but there is non connected.`,
            details: `I'd love to, but I cannot proceed without a ${expectedType}`,
            type: CodyResponseType.Error
        };
    }

    return sources;
}

export const getTargetsOfType = (node: Node, expectedType: NodeType, ignoreOthers: boolean = false, includeChildren: boolean = false, allowEmpty: boolean = false): List<Success> | Error => {
    let targets = node.getTargets().filter(t => t.getType() === expectedType);

    if(targets.count() !== node.getTargets().count() && !ignoreOthers) {
        return {
            cody: `Only "${expectedType}" is a valid target for "${node.getName()}", but there seem to be other card types connected.`,
            details: `You might have a second look at it?`,
            type: CodyResponseType.Error
        };
    }

    if(includeChildren) {
        node.getChildren().forEach(child => {
            targets = targets.push(...child.getTargets().filter(t => t.getType() === expectedType));
        })
    }

    if(targets.count() === 0 && !allowEmpty) {
        return {
            cody: `Looking for a "${expectedType}" as a target of "${node.getName()}", but there is non connected.`,
            details: `I'd love to, but I cannot proceed without a ${expectedType}`,
            type: CodyResponseType.Error
        };
    }

    return targets;
}

export const getSourcesOfTypeWithParentLookup = (node: Node, expectedType: NodeType): List<Success> => {
    let sources: List<Success> = List();

    for(const source of node.getSources()) {
        if(source.getType() === expectedType) {
            sources = sources.push(source);
        } else {
            const parent = source.getParent();
            if(parent && parent.getType() === expectedType) {
                sources = sources.push(parent);
            }
        }
    }

    return sources;
}

export const getTargetsOfTypeWithParentLookup = (node: Node, expectedType: NodeType): List<Success> => {
    let targets: List<Success> = List();

    for(const target of node.getTargets()) {
        if(target.getType() === expectedType) {
            targets = targets.push(target);
        } else {
            const parent = target.getParent();
            if(parent && parent.getType() === expectedType) {
                targets = targets.push(parent);
            }
        }
    }

    return targets;
}
