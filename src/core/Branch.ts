import Client from "./Client";
import Message from "./Message";
import State, { MatchFunction } from "./State";

export type BranchCallback = (message: Message, client: Client) => Promise<void>;

export default class Branch {
    to?: State;

    constructor(
        readonly label: string,
        to?: State,
        readonly callback?: BranchCallback
    ) {
        if (to) this.to = to;
    }

    addTo(to: State) {
        this.to = to;
    }

    state(id: string, message: string, catchMessage: string, matchFunction: MatchFunction): void {
        const newState = new State(id, {
            text: message
        }, {
            text: catchMessage
        }, matchFunction);
        this.addTo(newState);
    }
}