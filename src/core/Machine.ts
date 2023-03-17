import ClientRepository from "../repositories/Client.repository";
import Client from "./Client";
import Flow from "./Flow";
import Message from "./Message";
import State from "./State";

export default class Machine {
    constructor(
        private readonly flow: Flow,
        private readonly options: MachineOptions,
        private readonly clientRepository: ClientRepository,
        private readonly sendMessage: (client: Client, message: Message) => Promise<void>
    ) { }

    async handleMessage(phone: string, message: Message): Promise<void> {
        // TODO: implement this method
    }
}

export interface MachineOptions {
    defaultState: State
}