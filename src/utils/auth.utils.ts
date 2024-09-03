import localStorageUtils, { KeyStorage } from "./local-storage.utils";

export const getInitAuth = () => {
    try {
        const auth = localStorageUtils.getObject(KeyStorage.AUTH, null);
        return auth;
    } catch (error) {
        return null;
    }
}

