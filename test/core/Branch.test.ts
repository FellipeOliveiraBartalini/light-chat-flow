import State from "../../src/core/State";
import SendMessageFakeGateway from "../../src/gateways/SendMessageFake.gateway";
import labelEqualsText from "../../src/utils/matchFunctions/labelEqualsText";

let start: State;
let end: State;

const sendMessageGateway = new SendMessageFakeGateway();

beforeEach(() => {
    start = new State("start", {
        text: "Oi maluco"
    }, {
        text: "Nun tindi"
    }, labelEqualsText, sendMessageGateway);

    end = new State("end", {
        text: "Vatimbora maluco"
    }, {
        text: "Faladireito"
    }, labelEqualsText, sendMessageGateway);

    start.createBranch("Faaala", end);
});

test("Teste branch - Dummy", () => {
    expect(true).toBeTruthy();
});