import axios, { AxiosInstance } from 'axios';
import { AsyncStorage } from 'react-native';
import { ENV_CONSTANTS } from '../constants';
import RootStore from './rootStore';

export default class AxiosStore {
    private rootStore: RootStore;
    public instance: AxiosInstance;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.instance = axios.create(undefined);
    }

    public create = async () => {
        try {
            const response = await AsyncStorage.getItem('authToken');
            if (response !== undefined) {
                this.rootStore.axiosStore.instance = axios.create({
                    baseURL: ENV_CONSTANTS.baseURL,
                    headers: { Authorization: 'Token ' + response }
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
}
