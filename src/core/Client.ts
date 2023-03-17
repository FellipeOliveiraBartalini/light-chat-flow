export default class Client {

    hashState: string;

    constructor(
        readonly phone: string
    ) {
        this.hashState = "";
    }
}