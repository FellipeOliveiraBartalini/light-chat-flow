import Branch from "../../core/Branch";
import Message from "../../core/Message";
import { MatchFunction } from "../../core/State";

const labelEqualsText: MatchFunction = (message: Message, branch: Branch): boolean => {
    return message.text === branch.label;
};

export default labelEqualsText;