"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Flow_1 = __importDefault(require("./core/Flow"));
const Machine_1 = __importDefault(require("./core/Machine"));
const Message_1 = __importDefault(require("./core/Message"));
const State_1 = __importDefault(require("./core/State"));
const ClientMemory_repository_1 = __importDefault(require("./repositories/ClientMemory.repository"));
const clientRepository = new ClientMemory_repository_1.default();
const flow = new Flow_1.default();
const startMessage = new Message_1.default("Olá, aqui é o plínio");
const startCatchMessage = new Message_1.default("Olá, aqui é o plínio");
const start = new State_1.default("start", startMessage, startCatchMessage);
flow.addState(start);
const endMessage = new Message_1.default("Olá, aqui é o plínio");
const endCatchMessage = new Message_1.default("Olá, aqui é o plínio");
const end = new State_1.default("end", endMessage, endCatchMessage);
flow.addState(end);
flow.addBridge({
    from: start,
    to: end,
    callback: (msg, client) => __awaiter(void 0, void 0, void 0, function* () { }),
    matchFunction: (msg) => true
});
const machineOptions = {
    defaultState: start
};
const sendMessage = (client, message) => __awaiter(void 0, void 0, void 0, function* () { console.log(`${client.phone} - ${message.text}`); });
const machine = new Machine_1.default(flow, machineOptions, clientRepository, sendMessage);
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield machine.handleMessage('5544998096424', {
        text: "Olá!"
    });
}))();
