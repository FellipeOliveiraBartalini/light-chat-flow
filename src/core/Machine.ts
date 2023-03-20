import ClientRepository from "../repositories/Client.repository";
import Client from "./Client";
import Flow from "./Flow";
import Message from "./Message";

export default class Machine {
    constructor(
        private readonly flow: Flow,
        private readonly clientRepository: ClientRepository,
        private readonly sendMessage: (client: Client, message: Message) => Promise<void>
    ) { }

    async handleMessage(id: string, message: Message, stateId?: string): Promise<void> {
        let client: Client;

        try {
            client = await this.clientRepository.getClient(id);
        } catch (e) {
            client = new Client(id);
            this.clientRepository.saveClient(client);
        }

        const hashState = client.hashState;

    }
}