import axios from "axios";

const instance = axios.create({
    baseURL: 'https://hire-sync-server-eta.vercel.app/api/v1',
    withCredentials:true
});

const useAxios = () => {
    return instance
};


export default useAxios;