
export const getImageUrl = (fileName?: string) => {
    if (!fileName || fileName.length <= 0) return;

    return 'http://127.0.0.1:8000/' + fileName;
};