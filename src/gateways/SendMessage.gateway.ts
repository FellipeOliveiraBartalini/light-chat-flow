import Message from "../core/Message";

export default interface SendMessageGateway {
    send(message: Message): Promise<void>
}