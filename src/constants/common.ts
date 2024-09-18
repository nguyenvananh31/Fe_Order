import { AliasToken } from "antd/es/theme/internal";

export const getImageUrl = (fileName?: string) => {
    if (!fileName || fileName.length <= 0) return;
    return import.meta.env.VITE_API_DOMAIN + '/' + fileName;
};

// File
export const FileRule = {
    accepts: 'image/jpeg, image/png, image/jpg',
    size: 26214400,
    avatarSize: 5242880,
    loadding: 3000, // second
};

export const themeToken: Partial<AliasToken> | undefined = {
    // fontSize: 14,
    // fontFamily: '"Verdana", sans-serif',
    colorPrimary: '#7367f0',
    colorInfo: '#7367f0',
};