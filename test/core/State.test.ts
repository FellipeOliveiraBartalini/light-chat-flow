import Message from "../../src/core/Message";
import State from "../../src/core/State";
import Branch from "../../src/core/Branch";
import labelEqualsText from "../../src/utils/matchFunctions/labelEqualsText";

let start: State;
let end: State;

beforeEach(() => {
    start = new State("start", {
        text: "Oi maluco"
    }, {
        text: "Nun tindi"
    }, labelEqualsText);

    end = new State("end", {
        text: "Vatimbora maluco"
    }, {
        text: "Faladireito"
    }, labelEqualsText);

    const branch = new Branch("Faaala", end);
    start.link(branch);

    const branch2 = new Branch("Num briga cumigo", end);
    start.link(branch2);
});

test("Teste state - lista options", () => {
    const opcoes = start.options();
    expect(opcoes.length).toBe(2);
});

test("Teste state - próximo estado", () => {
    const proximoEstado = start.nextState({
        id: "",
        text: "Faaala"
    });
    expect(proximoEstado.id).toBe("end");
});

test("Teste state - próximo estado não existente", () => {
    const catchFn = jest.fn();
    try {
        const proximoEstado = start.nextState({
            id: "",
            text: "Que?"
        });
    } catch (e) {
        catchFn(e);
    }
    expect(catchFn).toBeCalled();
});