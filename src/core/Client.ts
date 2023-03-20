export default class Client {

    hashState: string;

    constructor(
        readonly phone: string
    ) {
        this.hashState = "";
    }

    addStateIdToHash(stateId: string): string {
        const stateIds = this.hashState
            .split("|")
            .filter(ids => ids);

        stateIds.push(stateId);

        this.hashState = stateIds.join("|");
        return this.hashState;
    }
}