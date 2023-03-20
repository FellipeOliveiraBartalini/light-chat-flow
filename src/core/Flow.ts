import State from "./State";

export default class Flow {
    states: State[];

    constructor(
        readonly options: FlowOptions
    ) {
        this.states = [];
    }

    addStates(state: State): void {
        this.states.push(state);
    }

    getStateByHash(hash: string): State {
        if (!hash) {
            return this.options.defaultState;
        }

        let state: State;
        let localStates = [...this.states];
        const hashParts = hash.split("|");

        while (true) {
            const filtredStates = localStates.filter(state => state.id === hashParts[0]);
            
            if (filtredStates.length < 1) {
                return this.options.defaultState;
            }

            state = filtredStates[0];
            localStates = state.branchs.map(branch => branch.to);
            
            hashParts.shift();
            if (hashParts.length < 1) return state;
        }
    }
}

export interface FlowOptions {
    defaultState: State
}