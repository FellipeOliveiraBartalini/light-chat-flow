import Branch from "./Branch";
import Message from "./Message";

export default class State {

    branchs: Branch[];

    constructor(
        readonly id: string,
        readonly message: Message,
        readonly catchMessage: Message
    ) {
        this.branchs = [];
    }

    link(branch: Branch): void {
        this.branchs.push(branch);
    }

    options(): string[] {
        return this.branchs.map(branch => branch.label);
    }
}