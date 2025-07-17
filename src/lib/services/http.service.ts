async function _makeRequest(
	endpoint: string,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	options: RequestInit = {}
) {
	const httpOptions = {
		method: method as string,
		mode: 'cors' as RequestMode,
		cache: 'no-cache' as RequestCache,
		...options
	}
	
	if (method === 'GET' || method === 'DELETE') {
		httpOptions.headers = {
			'Content-Type': 'application/json',
			...httpOptions.headers
		};
	}

    const initialResponse = await fetch(endpoint, httpOptions);
    if (!initialResponse.ok) throw new Error(`HTTP error! status: ${initialResponse.status}`);
    const jsonResponse = await initialResponse.json();
    
    return {
        ok: initialResponse.ok,
        status: initialResponse.status,
        statusText: initialResponse.statusText,
        headers: initialResponse.headers,
        data: jsonResponse as Record<string, unknown>
    };
}

export const Http = {
	get: (endpoint: string, options?: RequestInit) => {
		return _makeRequest(endpoint, 'GET', options);
	},

	post: (endpoint: string, options?: RequestInit) => {
		return _makeRequest(endpoint, 'POST', options);
	},

	put: (endpoint: string, options?: RequestInit) => {
		return _makeRequest(endpoint, 'PUT', options);
	},

	delete: (endpoint: string, options?: RequestInit) => {
		return _makeRequest(endpoint, 'DELETE', options);
	}
};