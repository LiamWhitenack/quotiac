import CryptographBase from "./base";

class Riddle extends CryptographBase {
    question: string

    constructor(question: string, answer: string) {
        super(answer)
        this.question = question
    }
}
class RiddleSolvedInReverse extends CryptographBase {
    answer: string

    constructor(question: string, answer: string) {
        super(question)
        this.answer = answer
    }
}

export { Riddle, RiddleSolvedInReverse };