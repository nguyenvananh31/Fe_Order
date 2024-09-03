import { Form, GetProp, UploadFile, UploadProps } from "antd";
import { useEffect, useState } from "react"
import { apiGetCate } from "./categories.sevices";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const useListCate = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);

    //Lấy ra cate gory
    useEffect(() => {
        ; (async () => {
            setLoading(true);
            try {
                const res = await apiGetCate();
                if (res) {
                    console.log(res);
                }
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        })();
    }, []);

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

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };


    const showDraw = () => {
        setOpen(true);

    };

    return {
        loading,
        open,
        setOpen,
        dataSource,
        showDraw,
        form,
        handlePreview,
        previewOpen,
        previewImage,
        handleChange,
        fileList,
        setPreviewImage,
        setPreviewOpen,
        onCreateCate,
        normFile
    }
}

export default useListCate;