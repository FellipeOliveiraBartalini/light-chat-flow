import Branch, { BranchCallback } from "./core/Branch";
import Client from "./core/Client";
import Flow, { CreateStateCallback, FlowOptions } from "./core/Flow";
import Machine from "./core/Machine";
import Message from "./core/Message";
import State, { MatchFunction, MessagePayload } from "./core/State";

import SendMessageGateway from "./gateways/SendMessage.gateway";
import SendMessageConsoleGateway from "./gateways/SendMessageConsole.gateway";
import SendMessageFakeGateway from "./gateways/SendMessageFake.gateway";

import ClientRepository from "./repositories/Client.repository";
import ClientMemoryRepository from "./repositories/ClientMemory.repository";

import * as MatchFunctions from "./utils/matchFunctions";

export {
    Branch,
    BranchCallback,
    Client,
    Flow,
    CreateStateCallback,
    FlowOptions,
    Machine,
    Message,
    State,
    MatchFunction,
    MessagePayload,
    SendMessageGateway,
    SendMessageConsoleGateway,
    SendMessageFakeGateway,
    ClientRepository,
    ClientMemoryRepository,
    MatchFunctions
}