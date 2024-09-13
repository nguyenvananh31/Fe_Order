
export const getImageUrl = (fileName?: string) => {
    if (!fileName || fileName.length <= 0) return;
    return 'http://127.0.0.1:8000/' + fileName;
};

// File
export const FileRule = {
    accepts: 'image/jpeg, image/png, image/jpg',
    size: 26214400,
    avatarSize: 5242880,
    loadding: 3000, // second
};