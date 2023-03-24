import Branch from "../../core/Branch";
import Message from "../../core/Message";
import { MatchFunction } from "../../core/State";

const labelEqualsTextOrNumber: MatchFunction = (message: Message, branch: Branch): boolean => {
    const text = message.text.trim();
    const labelEqualsText = text === branch.label;
    const numberMatch = text.match(/^[\d]{1,}$/);
    const isNumber = !!numberMatch;
    if (!isNumber) return labelEqualsText;
    const number = parseInt(numberMatch[0]);
    
    return branch.order === number - 1;
};

export default labelEqualsTextOrNumber;