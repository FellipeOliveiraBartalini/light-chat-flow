import Branch, { BranchCallback } from "./Branch";
import Message from "./Message";

export interface MessagePayload {
    text: string
}

export default class State {

    branchs: Branch[];

    constructor(
        readonly id: string,
        readonly message: MessagePayload,
        readonly catchMessage: MessagePayload
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
}