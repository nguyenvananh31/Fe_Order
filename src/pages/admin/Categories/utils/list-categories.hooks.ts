import { Form, GetProp, UploadFile, UploadProps } from "antd";
import { useState } from "react"

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export default function useListCate() {
    const [loading, setLoading] = useState<boolean>(false);
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const onCreateCate = async () => {
        const formData = new FormData();
        formData.append('name', form.getFieldValue('name'));
        setLoading(true);
        try {
            
        } catch (error) {
            
        }
        setLoading(false);
    }
    return {
        loading,
        form,
        handlePreview,
        previewOpen,
        previewImage,
        handleChange,
        fileList,
        setPreviewImage,
        setPreviewOpen,
        onCreateCate
    }
}