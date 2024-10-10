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

export type AIRsModel = {
    pets: [AIRModel,AIRModel ]
}

export type AIRModel = {
    num: number
    name: string
    category: string
    personality: string
    why: string
}