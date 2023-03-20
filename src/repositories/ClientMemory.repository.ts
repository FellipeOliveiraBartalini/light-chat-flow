import Client from "../core/Client";
import ClientRepository from "./Client.repository";

export default class ClientMemoryRepository implements ClientRepository {
    clients: Client[];

    constructor() {
        this.clients = [];
    }

    async saveClient(client: Client): Promise<Client> {
        const newClients = this.clients.filter(c => c.id !== client.id);
        newClients.push(client);
        this.clients = newClients;
        return client;
    }

    async getClient(id: string): Promise<Client> {
        const clientsFiltred = this.clients.filter(c => c.id === id);
        if (clientsFiltred.length < 1) throw "Client not found!";
        return clientsFiltred[0];
    }

    async deleteClient(client: Client): Promise<Client> {
        const newClients = this.clients.filter(c => c.id !== client.id);
        this.clients = newClients;
        return client;
    }

}