export interface BoardListGet {
    "id": number
    "title": string,
    "nickname": string,
}

export interface BoardDetailGet {
    "id": number,
    "title": string,
    "content": string,
    "nickname": string,
    "comments_count": number,
    "comments": [],
    "category": string,
}

export interface BoardPost {
    "title": string,
    "content": string,
    "nickname": string,
}

export interface BoardPut {
    "title": string,
    "content": string,
    "nickname": string,
}

export interface BoardDelete {
    "title": string,
    "content": string,
    "nickname": string,
}