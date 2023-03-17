import State from "./State";

export default class Flow {
    states: State[];

    constructor(
        options: FlowOptions
    ) {
        this.states = [];
    }
}

export interface FlowOptions {
    defaultState: State
}