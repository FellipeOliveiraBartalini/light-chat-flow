import Client from "../core/Client";
import State from "../core/State";

export default interface SendMessageGateway {
    sendCatchMessage(client: Client, state: State): Promise<void>,
    sendMessageByState(client: Client, state: State): Promise<void>
}