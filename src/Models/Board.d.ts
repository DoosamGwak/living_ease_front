export interface BoardListGet {
    "id": number
    "title": string,
    "nickname": string,
    "content_snippet": string,
    "created_at": string,
    "profile_image": string
}

export interface BoardDetailGet {
    "id": number,
    "title": string,
    "content": string,
    "images": any,
    "nickname": string,
    "comments_count": number,
    "category": string,
}

export interface BoardPost {
    "pk": number
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