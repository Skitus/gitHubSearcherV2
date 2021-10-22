import axios from 'axios';

class GitHubService {
    private headers = { Authorization: `token ${process.env.REACT_APP_ACCESS_TOKEN}` };

    private URL = 'https://api.github.com/';

    async getAllUsers(userName: string) {
      const res = await axios.get(`${this.URL}search/users`, {
        headers: this.headers,
        params: {
          per_page: 5,
          q: userName || 'arthur',
        },
      });
      return res.data;
    }

    async getUserById(userName: string) {
      const res = await axios.get(`${this.URL}users/${userName}`, {
        headers: this.headers,
      });
      return res.data;
    }

    getAllUsersRepos(users:any) {
      const res: any = Promise.all(users.map((user: any) => axios.get(user.repos_url, {
        params: {
          per_page: 100,
        },
      })
        .then((response) => (response.data))));
      return res;
    }

    async getUserRepos(userName: string, repos: string) {
      const res = await axios.get(`${this.URL}search/repositories?q=${repos} user:${userName} fork:true `, {
        headers: this.headers,
        params: {
          per_page: 100,
        },
      });
      return res.data;
    }
}

const gitHubService = new GitHubService();
export default gitHubService;
