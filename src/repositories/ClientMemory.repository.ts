import Client from "../core/Client";
import ClientRepository from "./Client.repository";

export default class ClientMemoryRepository implements ClientRepository {
    clients: Client[];

    constructor() {
        this.clients = [];
    }

    async saveClient(client: Client): Promise<Client> {
        const newClients = this.clients.filter(c => c.phone !== client.phone);
        newClients.push(client);
        this.clients = newClients;
        return client;
    }

    async getClient(phone: string): Promise<Client> {
        const clientsFiltred = this.clients.filter(c => c.phone === phone);
        if (clientsFiltred.length < 1) throw "Client not found!";
        return clientsFiltred[0];
    }

    async deleteClient(client: Client): Promise<Client> {
        const newClients = this.clients.filter(c => c.phone !== client.phone);
        this.clients = newClients;
        return client;
    }

}