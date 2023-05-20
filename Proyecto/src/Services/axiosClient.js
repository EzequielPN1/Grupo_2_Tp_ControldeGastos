import axios from 'axios'
//import { useUserStore } from '../stores/user';


//const store = useUserStore();
//const { user } = storeToRefs(store);

const axiosClient = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //  Authorization: `Bearer ${user.token}`
    }
})

export default {
    getApiClient() {
        return axiosClient;
    }
}