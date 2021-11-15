export interface User {
    avatar_url: string,
    login: string,
    email: string,
    location: string,
    created_at: string,
    bio: string,
    followers: number,
    following: number
}

export interface UserRepo {
    id: number,
    name: string,
    forks_count: number,
    stargazers_count: number,
    html_url: string
}

export interface Users {
    login: string,
    avatar_url: string,
    id: number
}

export interface UsersRepos {
    id: number,
    total_count: number
}
