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

    async getUserInfo(username, password) {
        return axiosAgent.get(`login/${username}/${password}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    employeeID: undefined,
                    permLevel: undefined,
                    firstname: undefined,
                    lastname: undefined
                 }));
    }

    async clockIn(employeeID) {
        console.log(`Clocking in employee!! ${employeeID}`)
        return axiosAgent.post(`clock-in`, {  employeeID })
            .then(response => response.data)
            .catch(error => {
                console.error("Clock in error:", error);
                return { status: "Failed", error: error.response.data };
            });
    }

    async clockOut(employeeID) {
        console.log(`Clocking out employee!! ${employeeID}`)
        return axiosAgent.post(`clock-out`, {  employeeID })
            .then(response => response.data)
            .catch(error => {
                console.error("Clock out error:", error);
                return { status: "Failed", error: error.response.data };
            });
    }

    async clockedInStatus(employeeID) {
        console.log("Requesting status for employeeID in API_Interface:", employeeID);
        try {
            const response = await axiosAgent.get(`/status/${employeeID}`);
            return response.data;
        } catch (error) {
            console.error("Fetch status error:", error);
            return { status: "Failed", error: error.response.data };
        }

    }

    async messagesWithEmployeeID(employeeID) {
        return axiosAgent.get(`message/${employeeID}`);
    }

    async messagesUpdate(employeeID, messageID, message) {
        axiosAgent.get(`message/${employeeID}/${messageID}/${message}`);
    }

    /*
    async employeeWithID(employeeID) {
        console.log(`Finding information for ${employeeID}`);
        return axiosAgent.get(`employee/${employeeID}`);
    }
    */

    async employeeUnpaidWithID(employeeID) {
        console.log(`Finding information for ${employeeID}`);
        return axiosAgent.get(`employee/${employeeID}`);
    }

    async updateTotalHours(unpaid_hours, employeeID) {
        return axiosAgent.put(`employee/update-hours/${employeeID}/${unpaid_hours}`);
    }

    async setTotalHours(unpaid_hours, employeeID) {
        return axiosAgent.put(`employee/set-hours/${employeeID}/${unpaid_hours}`);
    }

    async schedulesWithEmployeeID(employeeID) {
        return axiosAgent.get(`schedule/${employeeID}`);
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