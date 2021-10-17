import axios from 'axios';

class Http {
    headers = {Authorization: `token ${process.env.REACT_APP_ACCESS_TOKEN}`};

    constructor(
        private URL: string = 'https://api.github.com/',
    ) {
    }

    async getAllUsers(userName: string) {
        return await axios.get(`${this.URL}search/users`, {
            headers: this.headers,
            params: {
                per_page: 5,
                q: userName || "arthur",
            },
        }).then((response) => response.data)
            .catch((error) => console.log(error))
    };


    async getUserById(login: string) {
        return await axios.get(`${this.URL}users/${login}`, {
            headers: this.headers,
        })
            .then((response) => response.data)
            .catch((error) => console.log(error))
    };

    async getAllUsersRepos(users: any) {
        if (users) {
            const res: any = await Promise.all(users.items.map((user: any) => axios.get(user.repos_url, {
                params: {
                    per_page: 100,
                }
            })
                .then((response) => (response.data))));
            return res
        }
    };

    async getUserRepos(userName:string, repos:string) {
        const res = await axios.get(`${this.URL}search/repositories?q=${repos} user:${userName} fork:true `, {
            headers: this.headers,
            params: {
                per_page: 100,
            }
        }).then((response) => (response.data));
        return res;
    }
}

const http = new Http();
export default http;