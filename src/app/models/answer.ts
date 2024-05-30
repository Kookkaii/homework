export interface answer {
    questionCategoryId: string,
    questions: answerDetailList[],
}
export interface answerDetailList {
    questionId: string,
    answers: answerDetail[]
}
export interface answerDetail {
    questionAnswerId: string
}

export interface scoreData {
    fullScore: number
    score:number
}