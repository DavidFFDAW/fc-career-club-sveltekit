function _makeRequest(
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

	return fetch(endpoint, httpOptions).then(response => {
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return {json: response.json(), response: response};
	})
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