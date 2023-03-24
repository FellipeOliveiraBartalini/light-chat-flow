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

flow.createState("start", "Olá, aqui é o plínio.", "Desculpa, não te entendi", (newState) => {
    const educado = newState.branch("Olá").state("educado", "Que bom saber que você é um cliente educado", "Eu não te entendi meu bom amigo", labelEqualsTextOrNumber)

    educado.branch("Sou mesmo!").state("soumemo", "Ish, que arrogância", "Eu não te entendi arrogante.", labelEqualsTextOrNumber)
    educado.branch("Será!?").state("sera", "Aí vc me complica compadre", "Não te entendi compadre", labelEqualsTextOrNumber);

    const chato = newState.branch("Hum").state("chato", "Que difícil hein, vc é um cara chato, que pena", "Fala de novo", labelEqualsTextOrNumber);

    chato.branch("Sou mesmo!").state("souchatomemo", "Ish, que arrogância", "Eu não te entendi arrogante.", labelEqualsTextOrNumber)
    chato.branch("Não sou não!").state("naosouchato", "Vamos descobrir", "Eu não te entendi inoscente.", labelEqualsTextOrNumber);
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
