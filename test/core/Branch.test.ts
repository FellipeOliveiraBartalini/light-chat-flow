import State from "../../src/core/State";

let start: State;
let end: State;

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

    start.createBranch("Faaala", end);
});

test("Teste branch - Dummy", () => {
    expect(true).toBeTruthy();
});