import axios, { AxiosInstance } from 'axios';
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
            this.rootStore.axiosStore.instance = axios.create({
                baseURL: ENV_CONSTANTS.baseURL,
                headers: {
                    Authorization:
                        'Token ' +
                        (await this.rootStore.keychainStore.getKeychain())
                }
            });
        } catch (error) {
            console.log(error);
        }
    };
}
