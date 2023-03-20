import SendMessageGateway from "../gateways/SendMessage.gateway";
import Branch, { BranchCallback } from "./Branch";
import Message from "./Message";

export type MatchFunction = (message: Message, branch: Branch) => boolean;

export interface MessagePayload {
    text: string
}

export default class State {

    branchs: Branch[];

    constructor(
        readonly id: string,
        readonly message: MessagePayload,
        readonly catchMessage: MessagePayload,
        readonly matchFunction: MatchFunction,
        readonly sendMessageGateway: SendMessageGateway
    ) {
        this.branchs = [];
    }

    link(branch: Branch): void {
        this.branchs.push(branch);
    }

    createBranch(label: string, to: State, callback?: BranchCallback): State {
        const newBranch = new Branch(label, to, callback);
        this.link(newBranch);
        return this;
    }

    options(): string[] {
        return this.branchs.map(branch => branch.label);
    }

    nextState(message: Message): State {
        const branchsMatchs = this.branchs.filter(branch => this.matchFunction(message, branch));
        if (branchsMatchs.length < 0) throw "Next state not found!";
        return branchsMatchs[0].to;
    }
}