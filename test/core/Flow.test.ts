import Flow from "../../src/core/Flow"
import State from "../../src/core/State";

const start = new State("start", {
    text: "Olá meu povo!"
}, {
    text: "Desculpe não entendi vc!"
});

const end = new State("end", {
    text: "Foi bom te ver"
}, {
    text: "Tu é muito chato, não te entendo!"
});

start.link({
    from: start,
    to: end,
    callback: async (message, client) => {},
    label: "Oi",
    matchFunction: (message) => true
})

let flow: Flow;

beforeEach(() => {
    flow = new Flow({
        defaultState: start
    });

    flow.addStates(start);
})

test("Testando get state by client hash - start", () => {
    const state = flow.getStateByHash("start");
    expect(state.id).toBe("start");
});

test("Testando get state by client hash - end", () => {
    const state = flow.getStateByHash("start|end");
    expect(state.id).toBe("end");
});

test("Testando get state by client hash - vazio", () => {
    const state = flow.getStateByHash("");
    expect(state.id).toBe("start");
});

test("Testando get state by client hash - inexistente", () => {
    const state = flow.getStateByHash("start-estranho");
    expect(state.id).toBe("start");
});