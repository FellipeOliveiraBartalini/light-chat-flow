import Message from "../../src/core/Message";
import State from "../../src/core/State";
import Branch from "../../src/core/Branch";

let start: State;
let end: State;
let branch: Branch

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

    branch = new Branch("Faaala", start, end, async () => {});
    start.link(branch);
});

test("Teste branch - match func true", () => {
    const res = branch.matchFunction({
        text: "Faaala"
    });

    expect(res).toBeTruthy();
});

test("Teste branch - match func false", () => {
    const res = branch.matchFunction({
        text: "Oi"
    });

    expect(res).toBeFalsy();
});