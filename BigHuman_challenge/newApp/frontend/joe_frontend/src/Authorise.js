import decode from 'jwt-decode'; 

export default class Authorise {
    constructor(domain) {
        this.domain = domain || 'http://localhost:8000' 
        this.fetch = this.fetch.bind(this) 
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    fetchHash(email, password) { // Compare hashes
        return this.fetch(`${this.domain}/auth/check`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(res => {
            return res.json()
        })
    }

    login(email, password) { // Validate login attempt
        return this.fetch(`${this.domain}/auth`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(res => {
            return res.json()}) 
        .then(json => {
            if(json.token) { // If there's a token then 'setToken' on this  
                this.setToken(json.token);
            };
            return Promise.resolve(json);
        })
    }

    setToken(id) { // Saves user token to localStorage
        localStorage.setItem('id_token', id) 
    }

    loggedIn() { // Checks if there is a saved token, and if it's still valid
        const token = this.getToken() 
        return !!token && !this.isTokenExpired(token) // '!!' casts to a boolean
    }

    isTokenExpired(token) { // Checking decoded JWT if token still valid
        try {
            const decoded = decode(token);
            if(decoded.exp < Date.now() / 1000) return true; // Checking if token is expired against epoch
            else return false;
        } catch (err) {
            return false;
        }
    }

    getToken() { 
        return localStorage.getItem('id_token')
    }

    logout() { // Clears user token and profile data from 'localStorage'
        localStorage.removeItem('id_token');
    }

    getProfile() { // Use 'jwt-decode' to decode token and spec headers
        return decode(this.getToken());
    }

    fetch(url, options) { // Perform API call with the required authentication headers
        const headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}
        if(this.loggedIn()) headers['Authorization'] = 'Bearer ' + this.getToken(); // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        console.log(url, {headers, ...options});
        return fetch(url, {headers, ...options}); // Using the 'spread' operator to insert token
    }

    addEmployee(name, email, password) { // Call the 'EmployeesController' to add a new employee
        return this.fetch(`${this.domain}/employees/register`, {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
    }
}