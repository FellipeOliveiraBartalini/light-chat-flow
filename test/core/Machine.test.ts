import Client from "../../src/core/Client";
import Flow from "../../src/core/Flow";
import Machine from "../../src/core/Machine";
import State from "../../src/core/State";
import SendMessageFakeGateway from "../../src/gateways/SendMessageFake.gateway";
import ClientMemoryRepository from "../../src/repositories/ClientMemory.repository";
import labelEqualsText from "../../src/utils/matchFunctions/labelEqualsText";

let machine: Machine;

const defaultState = new State('default', {
    text: "Olá, é o seu primeiro contato conosco?"
}, {
    text: "Desulpe, não entendi, poderia repetir? É o seu primeiro contato conosco?"
}, labelEqualsText);

const secondState = new State('second', {
    text: "Entendi, vou estar encaminhando você para um dos nossos especialistas."
}, {
    text: "Desculpe, não entendi ainda. Vou estar encaminhando você para um de nossos especialistas."
}, labelEqualsText);

defaultState.createBranch("Sim", secondState);

const flow = new Flow({
    defaultState: defaultState
});

flow.addStates(defaultState);

const clientRepository = new ClientMemoryRepository();
const sendMessageGateway = new SendMessageFakeGateway();

beforeEach(() => {
    machine = new Machine(flow, clientRepository, sendMessageGateway);
});

test("Receive message test - not found client", async () => {
    const spy = jest.spyOn(sendMessageGateway, "sendMessageByState");
    await machine.handleMessage({
        id: '123',
        text: 'Oi'
    });

    expect(sendMessageGateway.sendMessageByState).toBeCalled();
    expect(clientRepository.clients.length).toBe(1);

    spy.mockReset();
});

test("Receive message test - client that exists", async () => {
    const spy = jest.spyOn(sendMessageGateway, "sendCatchMessage");

    const client = new Client("123");
    client.addStateIdToHash("default");
    clientRepository.clients = [client];

    await machine.handleMessage({
        id: '123',
        text: 'Oi'
    });

    expect(sendMessageGateway.sendCatchMessage).toBeCalled();
    expect(clientRepository.clients[0].hashState).toBe('default');

    spy.mockReset();
});

test("Receive message test - client that exists with empty state", async () => {
    const spy = jest.spyOn(sendMessageGateway, "sendCatchMessage");

    const client = new Client("123");
    client.addStateIdToHash("");
    clientRepository.clients = [client];

    await machine.handleMessage({
        id: '123',
        text: 'Oi'
    });

    expect(sendMessageGateway.sendCatchMessage).toBeCalled();
    expect(clientRepository.clients[0].hashState).toBe('');

    spy.mockReset();
});

test("Receive message test - client that exists with valid message", async () => {
    const spy = jest.spyOn(sendMessageGateway, "sendMessageByState");

    const client = new Client("123");
    client.addStateIdToHash("default");
    clientRepository.clients = [client];

    await machine.handleMessage({
        id: '123',
        text: 'Sim'
    });

    expect(sendMessageGateway.sendMessageByState).toBeCalled();
    expect(clientRepository.clients[0].hashState).toBe('default|second');

    spy.mockReset();
});

test("Receive message test - send message after end of flow", async () => {
    const spy = jest.spyOn(sendMessageGateway, "sendMessageByState");
    const spyCatch = jest.spyOn(sendMessageGateway, "sendCatchMessage");

    const client = new Client("123");
    client.addStateIdToHash("default");
    client.addStateIdToHash("second");
    clientRepository.clients = [client];

    await machine.handleMessage({
        id: '123',
        text: 'Sim'
    });

    expect(sendMessageGateway.sendMessageByState).not.toBeCalled();
    expect(sendMessageGateway.sendCatchMessage).not.toBeCalled();
    expect(clientRepository.clients[0].hashState).toBe('default|second');

    spy.mockReset();
});