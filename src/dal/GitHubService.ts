import axios from 'axios';

class GitHubService {
    private headers = { Authorization: `token ${process.env.REACT_APP_ACCESS_TOKEN}` };

    readonly BASE_URL = 'https://api.github.com/';

    async getAllUsers(userName: string, currentPageUsers:number) {
      const res = await axios.get(`${this.BASE_URL}search/users`, {
        headers: this.headers,
        params: {
          per_page: 5,
          q: userName || 'arthur',
          page: currentPageUsers || 1,
        },
      });
      return {
        data: res.data,
        per_page: res.config.params.per_page,
      };
    }

    async getUserById(userName: string) {
      const res = await axios.get(`${this.BASE_URL}users/${userName}`, {
        headers: this.headers,
      });
      return res.data;
    }

    getAllUsersRepos(users: []) {
      const res: any = Promise.all(users.map(
        (user: { repos_url: string }) => axios.get(user.repos_url, {
          params: {
            per_page: 30,
          },
        })
          .then((response) => (response.data)),
      ));
      return res;
    }

    async getUserRepos(userName: string, repoName: string, currentPageUserRepo: number) {
      const res = await axios.get(`${this.BASE_URL}search/repositories?q=${repoName || ''} user:${userName} fork:true `, {
        headers: this.headers,
        params: {
          page: currentPageUserRepo || 1,
        },
      });
      return res.data;
    }
}

const gitHubService = new GitHubService();
export default gitHubService;
