import axios from 'axios';

const AxiosConfigured = () => {
    // Indicate to the API that all requests for this app are AJAX
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Set the baseURL for all requests to the API domain instead of the current domain
    // axios.defaults.baseURL = `http://localhost:8443/api/v1`;
    axios.defaults.baseURL = `http://localhost:8443/api/v1`;


    // Allow the browser to send cookies to the API domain (which include auth_token)
    axios.defaults.withCredentials = true;


//    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

    return axios;
};


const axiosAgent = AxiosConfigured();

export default class APIInterface {

    async getUserInfo(firstName, lastName) {
        return axiosAgent.get(`login/${firstName}/${lastName}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    employeeID: undefined,
                    permLevel: undefined
                 }));
    }

    async clockIn(employeeID) {
        return axiosAgent.post(`clock-in/${employeeID}`)
            .then(response => response.data)
            .catch(error => {
                console.error("Clock in error:", error);
                return { status: "Failed", error };
            });
    }


    //Reference API Calls for quick reference
    //Do not impliment the commented out lines, these are only for reference and not production
    /*
    async allRoutes() {
        return axiosAgent.get(`routes/all-routes`);
    }

    async routesWithID(routeID) {
        return axiosAgent.get(`routes/${routeID}`);
    }
    */
}