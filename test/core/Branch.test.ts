import State from "../../src/core/State";
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

    start.createBranch("Faaala", end);
});

test("Teste branch - Dummy", () => {
    expect(true).toBeTruthy();
});