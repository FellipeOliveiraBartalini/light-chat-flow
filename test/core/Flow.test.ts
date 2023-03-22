import Flow from "../../src/core/Flow"
import State from "../../src/core/State";
import labelEqualsText from "../../src/utils/matchFunctions/labelEqualsText";

const ID = "a998097777";

const start = new State("start", {
    text: "Olá meu povo!"
}, {
    text: "Desculpe não entendi vc!"
}, labelEqualsText);

const end = new State("end", {
    text: "Foi bom te ver"
}, {
    text: "Tu é muito chato, não te entendo!"
}, labelEqualsText);

start
    .createBranch("Oi", end);

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