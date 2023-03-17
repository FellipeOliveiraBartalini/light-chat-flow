import Message from "./Message";

export default class State {
    constructor(
        readonly id: string,
        readonly message: Message,
        readonly catchMessage: Message
    ) { }
}