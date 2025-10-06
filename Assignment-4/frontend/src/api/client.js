const API_URL = 'http://localhost:5000'; //BACKEND URL

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...(options.headers || {})
    },
    credentials: 'include',
    ...options
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `HTTP ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const PostsAPI = {
  async list() {
    const data = await request('/api/posts');
    // backend returns { page, limit, total, items }
    return Array.isArray(data) ? data : (data.items || []);
  },
  get(id) {
    return request(`/api/posts/${id}`);
  },
  create({ title, content }) {
    const author = localStorage.getItem('userId');
    return request('/api/posts', { method: 'POST', body: JSON.stringify({ title, content, author }) });
  },
  update(id, { title, content }) {
    return request(`/api/posts/${id}`, { method: 'PUT', body: JSON.stringify({ title, content }) });
  },
  remove(id) {
    return request(`/api/posts/${id}`, { method: 'DELETE' });
  }
};

export const AuthAPI = {
  register(data) {
    return request('/api/users/register', { method: 'POST', body: JSON.stringify(data) });
  },
  login(data) {
    return request('/api/users/login', { method: 'POST', body: JSON.stringify(data) });
  }
};


