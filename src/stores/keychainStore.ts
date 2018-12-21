import { action, observable } from 'mobx';
import * as Keychain from 'react-native-keychain';
import RootStore from './rootStore';

const TOKEN_KEYCHAIN_NAME = 'authToken';

export default class KeychainStore {
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action
    public setKeychain = (authToken: string) => {
        Keychain.setGenericPassword(TOKEN_KEYCHAIN_NAME, authToken);
    };

    public getKeychain = async () => {
        try {
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                // @ts-ignore
                return credentials.password;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    public deleteKeychain = async () => {
        await Keychain.resetGenericPassword();
    };
}
