import Message from "../core/Message";
import SendMessageGateway from "./SendMessage.gateway";

export default class SendMessageFakeGateway implements SendMessageGateway {
    async send(message: Message): Promise<void> {
        console.log(`\t\t\t\t\tBot: ${message.text}`);
    }
}