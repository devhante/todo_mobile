import { AsyncStorage } from "react-native";
import axios, { AxiosInstance } from 'axios';
import { action, observable, values } from "mobx";
import RootStore from "./rootStore";

export default class AxiosStore {
    @observable public instance = axios.create(undefined);
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action
    public create = () => {
        AsyncStorage.getItem('authToken')
        .then((response) => {
            if(response !== null) {
                this.rootStore.axiosStore.instance = axios.create({
                    baseURL: 'https://practice.alpaca.kr/api/',
                    headers: {'Authorization': 'Token ' + response }
                });
            }
        });
    }
}