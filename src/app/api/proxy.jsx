

export default class ApiProxy{


    static async getHeaders(requireAuth){
        let headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        const authToken = getToken()
        if (authToken && requireAuth){
            headers["Authorization"] = `Bearer ${authToken}`
        }
        return headers;
    }

    static async post(endpoint, object, requireAuth) {
        const jsonData = JSON.stringify(object)
        const headers = await ApiProxy.getHeaders(requireAuth)
        const requestOptions = {
            method: "POST",
            headers: headers,
            body: jsonData
        }
        return await ApiProxy.handleFetch(endpoint, requestOptions)
    }

    static async get(endpoint, requireAuth){
        const authToken = await getToken(authToken, requireAuth);
        
        if (authToken && requireAuth){
            headers["Authorization"] = `Bearer ${authToken}`
        }

        let headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...(authToken && { "Authorization": `Bearer ${authToken}` }),
        };
        
        return await fetch(endpoint, {
            method: "GET",
            headers: headers,
            body: JSON.stringify(requestData),
        });
        
    }
}