export type AIQModel = {
    pk: number
    type: string
    title: string
    content: string
    content_type: string
    answer: AIAModel[]
}

export type AIAModel = {
    pk: number
    content: string
}