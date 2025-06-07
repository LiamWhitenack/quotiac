import CryptographBase from "./base";

class Riddle extends CryptographBase {
    question: string

    constructor(question: string, answer: string) {
        super(answer, "Riddle")
        this.question = question
    }
}
class RiddleSolvedInReverse extends CryptographBase {
    answer: string

    constructor(question: string, answer: string) {
        super(question, "Reverse Riddle")
        this.answer = answer
    }
}

export { Riddle, RiddleSolvedInReverse };