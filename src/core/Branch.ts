import Client from "./Client";
import Message from "./Message";
import State from "./State";

export default class Branch {
    constructor(
        readonly label: string,
        readonly from: State,
        readonly to: State,
        readonly matchFunction: (message: Message, branch: Branch) => boolean,
        readonly callback: (message: Message, client: Client) => Promise<void>
    ) { }
}