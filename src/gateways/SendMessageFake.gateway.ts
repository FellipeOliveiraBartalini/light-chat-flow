import Client from "../core/Client";
import Message from "../core/Message";
import State, { MessagePayload } from "../core/State";
import SendMessageGateway from "./SendMessage.gateway";

export default class SendMessageFakeGateway implements SendMessageGateway {
    async sendCatchMessage(client: Client, state: State): Promise<void> {
    }
    async sendMessageByState(client: Client, state: State): Promise<void> {
    }

}