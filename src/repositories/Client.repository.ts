import Client from "../core/Client";

export default interface ClientRepository {
    saveClient(client: Client): Promise<Client>,
    getClient(phone: string): Promise<Client>,
    deleteClient(client: Client): Promise<Client>
}