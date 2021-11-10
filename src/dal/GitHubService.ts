import axios from 'axios';

export const USERS_PER_PAGE = 10;
export const REPOSITORIES_PER_PAGE = 30;

class GitHubService {
    private headers = { Authorization: `token ${process.env.REACT_APP_ACCESS_TOKEN}` };

    readonly BASE_URL = 'https://api.github.com/';

    async getAllUsers(userName: string, currentPageUsers: number) {
      return await axios.get(`${this.BASE_URL}search/users`, {
        headers: this.headers,
        params: {
          per_page: USERS_PER_PAGE,
          q: userName || 'arthur',
          page: currentPageUsers || 1,
        },
      });
    }

    async getUserById(userName: string) {
      return await axios.get(`${this.BASE_URL}users/${userName}`, {
        headers: this.headers,
      });
    }

    getAllUsersRepos(data: []) {
      return Promise.all(data.map((user: any) => axios.get(`${this.BASE_URL}search/repositories?q= user:${user.login} fork:true `, {
        params: {
          per_page: 1,
        },
      })
        .then((response) => (response.data))));
    }

    async getUserRepos(userName: string, repoName: string, currentPageUserRepo: number) {
      return await axios.get(`${this.BASE_URL}search/repositories?q=${repoName || ''} user:${userName} fork:true `, {
        headers: this.headers,
        params: {
          per_page: REPOSITORIES_PER_PAGE,
          page: currentPageUserRepo || 1,
        },
      });
    }
}

const gitHubService = new GitHubService();
export default gitHubService;
