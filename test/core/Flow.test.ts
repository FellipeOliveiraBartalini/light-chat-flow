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
        .createState({
            id: "start",
            message: "Olá meu povo!",
            catchMessage: "Desculpe, não entendi vc!",
            createStateCallback: (newState) => {
                newState
                    .branch("Oi")
                        .state({
                            id: "end",
                            message: "Foi bom te ver",
                            catchMessage: "Tu é muito chato, não te entendo!",
                            matchFunction: labelEqualsText
                        });
                return;
            }
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

test("Testando create state sem match Fn", () => {
    const catchFn = jest.fn();
    try {
        flow.options.defaultMatchFunction = undefined;
        flow.createState({
            id: "test",
            message: "Mensagem",
            catchMessage: "Defeito"
        });
    } catch (e) {
        catchFn(e);
    }
    expect(catchFn).toBeCalled();
});

test("Default state - throw", () => {
    const catchFn = jest.fn();
    try {
        flow.options.defaultState = undefined;
        flow.options.defaultStateId = undefined;
        flow.getDefaultState();
    } catch (e) {
        catchFn(e);
    }
    expect(catchFn).toBeCalled();
});

test("Get state by id - not found", () => {
    const catchFn = jest.fn();
    try {
        flow.getStateById('a');
    } catch (e) {
        catchFn(e);
    }
    expect(catchFn).toBeCalled();
});