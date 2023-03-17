import Branch from "./Branch";
import State from "./State";

export default class Flow {
    branchs: Branch[];
    states: State[];

    constructor() {
        this.branchs = [];
        this.states = [];
    }

    addState(state: State) {
        this.states.push(state);
    }

    addBridge(branch: Branch) {
        if (!this.states.includes(branch.from)) throw "From state not found!";
        if (!this.states.includes(branch.to)) throw "To state not found!";
        this.branchs.push(branch);
    }
}