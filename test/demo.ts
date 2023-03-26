import { question } from 'readline-sync';
import crypto from 'crypto';

import Flow, { NewFlowStateParams } from '../src/core/Flow';
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

const newFlowStateParams: NewFlowStateParams = {
    id: "start",
    message: "Olá, aqui é o plínio.",
    catchMessage: "Desculpa, não te entendi",
    createStateCallback: (newState) => {
        const educado = newState.branch("Olá")
            .state({
                id: "educado",
                message: "Que bom saber que você é um cliente educado",
                catchMessage: "Eu não te entendi meu bom amigo",
                matchFunction: labelEqualsTextOrNumber
            });

                educado.branch("Sou mesmo!")
                    .state({
                        id: "soumemo",
                        message: "Ish, que arrogância",
                        catchMessage: "Eu não te entendi arrogante.",
                        matchFunction: labelEqualsTextOrNumber
                    });

                educado.branch("Será!?")
                    .state({
                        id: "sera",
                        message: "Aí vc me complica compadre",
                        catchMessage: "Não te entendi compadre",
                        matchFunction: labelEqualsTextOrNumber
                    });

        const chato = newState.branch("Hum")
            .state({
                id: "chato",
                message: "Que difícil hein, vc é um cara chato, que pena",
                catchMessage: "Fala de novo",
                matchFunction: labelEqualsTextOrNumber
            });

                chato.branch("Sou mesmo!")
                    .state({
                        id: "souchatomemo",
                        message: "Ish, que arrogância",
                        catchMessage: "Eu não te entendi arrogante.",
                        matchFunction: labelEqualsTextOrNumber
                    });

                chato.branch("Não sou não!")
                    .state({
                        id: "naosouchato",
                        message: "Vamos descobrir",
                        catchMessage: "Eu não te entendi inoscente.",
                        matchFunction: labelEqualsTextOrNumber
                    });
    }
}

flow.createState(newFlowStateParams);

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
