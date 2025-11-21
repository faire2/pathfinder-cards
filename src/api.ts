export function createRequestInit(
    method: 'POST' | 'GET' | 'PUT' | 'DELETE',
    data?: Object
): RequestInit {
    return {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: data ? JSON.stringify(data) : undefined,
    }
}