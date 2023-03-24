import { question } from 'readline-sync';
import crypto from 'crypto';
import Flow from '../src/core/Flow';
import labelEqualsText from '../src/utils/matchFunctions/labelEqualsText';
import Machine from '../src/core/Machine';
import ClientMemoryRepository from '../src/repositories/ClientMemory.repository';
import SendMessageFakeGateway from '../src/gateways/SendMessageFake.gateway';

const clientRepository = new ClientMemoryRepository();
const sendMessageGateway = new SendMessageFakeGateway()

const flow = new Flow({
    defaultStateId: "start",
    defaultMatchFunction: labelEqualsText
});

flow
    .createState("start", "Olá meu povo!", "Desculpe, não entendi vc!", (newState) => {
        newState
            .branch("Oi")
            .state("end", "Foi bom te ver", "Tu é muito chato, não te entendo!", labelEqualsText);

        newState
            .branch("Ola")
            .state("endDois", "Você é um cara muito bacana, falou...", "Sai da minha frente", labelEqualsText);
        return;
    });

const machine = new Machine(flow, clientRepository, sendMessageGateway);

(async () => {
    const username = question("Whats your name? ");
    const id = crypto.randomUUID().slice(0, 5);

    while (true) {
        const messageFromUser = question(`${username}: `);
        await machine.handleMessage({
            id,
            text: messageFromUser
        });
    }
})()
