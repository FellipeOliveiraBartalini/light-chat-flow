import Client from "./Client";
import Message from "./Message";
import State, { MatchFunction } from "./State";

export type BranchCallback = (message: Message, client: Client) => Promise<void>;

export default class Branch {
    to?: State;
    order?: number;

    constructor(
        readonly label: string,
        to?: State,
        order?: number | null,
        readonly callback?: BranchCallback
    ) {
        if (to) this.to = to;
        if (order) this.order = order;
    }

    addTo(to: State) {
        this.to = to;
    }

    state(id: string, message: string, catchMessage: string, matchFunction: MatchFunction): State {
        const newState = new State(id, {
            text: message
        }, {
            text: catchMessage
        }, matchFunction);
        this.addTo(newState);
        return newState;
    }
}