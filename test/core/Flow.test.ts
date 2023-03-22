import Flow from "../../src/core/Flow"
import State from "../../src/core/State";
import labelEqualsText from "../../src/utils/matchFunctions/labelEqualsText";

let flow: Flow;

beforeEach(() => {
    flow = new Flow({
        defaultStateId: "start",
        defaultMatchFunction: labelEqualsText
    });

    flow
        .createState("start", "Olá meu povo!", "Desculpe, não entendi vc!", (newState) => {
            newState
                .branch("Oi")
                .state("end", "Foi bom te ver", "Tu é muito chato, não te entendo!", labelEqualsText);
            return;
        });
});

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