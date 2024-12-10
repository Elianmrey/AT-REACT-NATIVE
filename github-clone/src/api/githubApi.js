const API_URL = 'https://api.github.com';

const getUserInfo = async (token) => {
    const response = await fetch(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
}
const getRepositories = async (token, page) => {
    const response = await fetch(`${API_URL}/user/repos?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
}
const getIssues =  async (token, owner, repo) => {
    const response = await fetch(`${API_URL}/repos/${owner}/${repo}/issues`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
}

export { getUserInfo, getRepositories, getIssues };
