import localStorageUtils, { KeyStorage } from "./local-storage.utils";

export const getInitAuth = () => {
    try {
        const auth = localStorageUtils.getObject(KeyStorage.AUTH);
        return auth;
    } catch (error) {
        return null;
    }
}

