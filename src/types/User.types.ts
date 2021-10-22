export interface IUser {
    avatar_url: string,
    login: string,
    email: string,
    location: string,
    created_at: string,
    bio: string,
    followers: number,
    following: number
}

export interface IUserRepo {
    name: string,
    forks_count: number,
    stargazers_count: number,
    html_url: string
}

export interface IUsers {
    login: string,
    avatar_url: string,
    id: number
}

export interface IUsersRepo {
    id: number,
    length: number
}
