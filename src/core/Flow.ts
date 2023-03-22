import State, { MatchFunction } from "./State";

export type CreateStateCallback = (newState: State, thisFlow: Flow) => void;

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
            return this.getDefaultState();
        }

        let state: State;
        let localStates: (State | undefined)[] = [...this.states];
        const hashParts = hash.split("|");

        while (true) {
            const filtredStates = localStates.filter(state => state && state.id === hashParts[0]);
            
            if (filtredStates.length < 1) {
                return this.getDefaultState();
            }

            if (!filtredStates[0]) throw "State not found";

            state = filtredStates[0];
            localStates = state.branchs
                .filter(branch => branch.to)
                .map(branch => branch.to);
            
            hashParts.shift();
            if (hashParts.length < 1) return state;
        }
    }

    createState(id: string, message: string, catchMessage: string, createStateCallback?: CreateStateCallback, matchFunction?: MatchFunction): Flow {
        const matchFunctionDefined = matchFunction ? matchFunction : this.options.defaultMatchFunction;
        if (!matchFunctionDefined) throw "Missing matchFn";

        const newState = new State(id, {
            text: message
        }, {
            text: catchMessage
        }, matchFunctionDefined);

        if (createStateCallback) {
            createStateCallback(newState, this);
        }

        this.addStates(newState);
        return this;
    }

    getDefaultState(): State {
        if (this.options.defaultState) return this.options.defaultState;
        if (this.options.defaultStateId) return this.getStateById(this.options.defaultStateId);
        throw "Default state not defined";
    }

    getStateById(id: string): State {
        const filtredStates = this.states.filter(state => state.id === id);
        if (filtredStates.length < 1) throw `State not found by id: ${id}`;
        return filtredStates[0];
    }
}

export interface FlowOptions {
    defaultState?: State,
    defaultStateId?: string,
    defaultMatchFunction?: MatchFunction
}