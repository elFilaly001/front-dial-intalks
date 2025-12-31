import axios, { AxiosError } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/v1" || '';

const v1Api = axios.create({
    baseURL,
});

const isBrowser = typeof window !== 'undefined';

const getToken = () => (isBrowser ? localStorage.getItem('token') : null);

export function setAuthToken(token: string) {
    if (token) {
        v1Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete v1Api.defaults.headers.common["Authorization"];
    }
}

// Set initial token from localStorage if available
if (isBrowser) {
    const token = getToken();
    if (token) {
        setAuthToken(token);
    }
}

v1Api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const status = (error.response && error.response.status) || null;
        const requestConfig: any = (error as any)?.config || {};
        const skipRedirect = requestConfig?.headers?.['x-skip-auth-redirect'];

        if (isBrowser && (status === 401 || status === 403) && !skipRedirect) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export { v1Api };