import Client from "./Client";
import Message from "./Message";
import State from "./State";

export default class Branch {
    constructor(
        readonly from: State,
        readonly to: State,
        readonly matchFunction: (message: Message) => boolean,
        readonly callback: (message: Message, client: Client) => Promise<void>
    ) { }
}