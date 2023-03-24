import { question } from 'readline-sync';
import crypto from 'crypto';

import Flow from '../src/core/Flow';
import Machine from '../src/core/Machine';

import ClientMemoryRepository from '../src/repositories/ClientMemory.repository';

import SendMessageConsoleGateway from '../src/gateways/SendMessageConsole.gateway';

import labelEqualsTextOrNumber from '../src/utils/matchFunctions/labelEqualsTextOrNumber';

const clientRepository = new ClientMemoryRepository();
const sendMessageGateway = new SendMessageConsoleGateway()

const flow = new Flow({
    defaultStateId: "start",
    defaultMatchFunction: labelEqualsTextOrNumber
});

flow
    .createState("start", "Olá meu povo!", "Desculpe, não entendi vc!", (newState) => {
        newState
            .branch("Oi")
            .state("end", "Foi bom te ver", "Tu é muito chato, não te entendo!", labelEqualsTextOrNumber);

        newState
            .branch("Ola")
            .state("endDois", "Você é um cara muito bacana, falou...", "Sai da minha frente", labelEqualsTextOrNumber);
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
