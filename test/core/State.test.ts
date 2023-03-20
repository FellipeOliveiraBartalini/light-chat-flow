import Message from "../../src/core/Message";
import State from "../../src/core/State";
import Branch from "../../src/core/Branch";

let start: State;
let end: State

beforeEach(() => {
    start = new State("start", {
        text: "Oi maluco"
    }, {
        text: "Nun tindi"
    });

    end = new State("end", {
        text: "Vatimbora maluco"
    }, {
        text: "Faladireito"
    });

    const branch = new Branch("Faaala", start, end, async () => {});
    start.link(branch);

    const branch2 = new Branch("Num briga cumigo", start, end, async () => {});
    start.link(branch2);
});

test("Teste state - lista options", () => {
    const opcoes = start.options();
    expect(opcoes.length).toBe(2);
});