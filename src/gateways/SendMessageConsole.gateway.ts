import Client from "../core/Client";
import Message from "../core/Message";
import State, { MessagePayload } from "../core/State";
import SendMessageGateway from "./SendMessage.gateway";

export default class SendMessageConsoleGateway implements SendMessageGateway {
    async sendMessageByState(client: Client, state: State): Promise<void> {
        const options = state.options();

        if (options.length > 0) {
            const optionsWithNumbers = options
                .map((option, index) => `${this.spacing(4)}${index + 1}) ${option}`)
                .join('\n');
            const text = `${state.message.text}\n${optionsWithNumbers}`;
            this.sendMessage({ text });
            return;
        }
        
        const text = `${state.message.text}`;
        this.sendMessage({ text });
        return;
    }

    async sendCatchMessage(client: Client, state: State): Promise<void> {
        this.sendMessage(state.catchMessage);
        this.sendMessageByState(client, state);
    }

    private sendMessage(message: MessagePayload) {
        this.log(message.text);
    }

    private spacing(count: number = 4): string {
        return Array(count).fill('\t').join('');
    }

    private log(str: string): void {
        console.log(`${this.spacing(4)}Bot: ${str}`);
    }
}