export interface questionDetail {
    questionCategoryId: string,
    title: string,
    totalQuestion: number,
    level: string,
    timeLimitOfMinuteUnit: number,
    questionInfo : questionInfo[]
}

export interface questionInfo {
    questionId: string,
    sequence: number,
    title: string,
    questionAnswerInfo : questionAnswerInfo[],
}
export interface questionAnswerInfo {
    questionAnswerId: string
    sequence: number,
    answer: string
}