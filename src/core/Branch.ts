import Client from "./Client";
import Message from "./Message";
import State from "./State";

export default class Branch {
    constructor(
        readonly label: string,
        readonly from: State,
        readonly to: State,
        readonly callback: (message: Message, client: Client) => Promise<void>
    ) { }

    matchFunction(message: Message): boolean {
        return message.text === this.label;
    }
}