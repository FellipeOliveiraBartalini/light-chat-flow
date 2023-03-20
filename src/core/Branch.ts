import Client from "./Client";
import Message from "./Message";
import State from "./State";

export type BranchCallback = (message: Message, client: Client) => Promise<void>;

export default class Branch {
    constructor(
        readonly label: string,
        readonly to: State,
        readonly callback?: BranchCallback
    ) { }
}