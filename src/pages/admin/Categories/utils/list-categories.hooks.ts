import { Form, GetProp, message, UploadFile, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { ICateReq } from "../../../../interFaces/categories";
import { apiCreateCate, apiDeleteCate, apiGetCate, apiGetOneCate } from "./categories.sevices";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

interface DataSource {
    id: number;
    name: string;
    status: number;
}

interface IState {
    loading: boolean;
    showDrawAdd: boolean;
    totalCate: number;
    pageIndex: number;
    pageSize: number;
    refresh: boolean;
}

const initstate: IState = {
    loading: false,
    showDrawAdd: false,
    totalCate: 0,
    pageIndex: 1,
    pageSize: 5,
    refresh: false
}

const useListCate = () => {
    const [state, setState] = useState<IState>(initstate);
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState<DataSource[] | null>(null);
    const [messageApi, contextHolder] = message.useMessage();

    //Lấy ra category
    useEffect(() => {
        ; (async () => {
            setState(prev => ({ ...prev, loading: !prev.loading }));
            try {
                const res = await apiGetCate({ 
                    page: state.pageIndex,
                    pageSize: state.pageSize
                });
                if (res.data) {
                    const newDataSource: any = res.data.map(item => ({
                        id: item.id,
                        name: item.name,
                        image: item.image,
                        status: item.status
                    }));
                    setDataSource(newDataSource);
                    setState(prev => ({ ...prev, totalCate: res.meta.total, pageIndex: res.meta.current_page }))
                }
            } catch (error) {
                console.log(error);
            }
            setState(prev => ({ ...prev, loading: !prev.loading }));
        })();
    }, [state.refresh]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const messageAlert = (type: any, content: string) => {
        messageApi.open({
            type,
            content,
        });
    }

    const onCreateCate = async (values: ICateReq) => {
        if (fileList?.length > 1) {
            messageAlert('error', "Hình ảnh không được lớn hơn 1 ảnh!");
            return;
        }
        setState(prev => ({ ...prev, loading: !prev.loading }));
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            if (values.description) formData.append('description', values.description);
            if (!!fileList) {
                fileList.forEach((item) => formData.append('image', item.originFileObj as any));
            }
            const res = await apiCreateCate(formData);
            if (res.data) {
                setDataSource(prev => ([
                    {
                        id: res.data.id,
                        name: res.data.name,
                        image: res.data.image,
                        status: res.data.status
                    },
                    ...prev!
                ]));
                form.resetFields();
                setState(prev => ({ ...prev, showDrawAdd: !state.showDrawAdd, totalCate: state.totalCate + 1 }));
                messageAlert('success', 'Thêm danh mục thành công!');
            }

        } catch (error: any) {
            console.log(error);
            messageAlert('error', "Thêm danh mục thất bại!");
        }
        setState(prev => ({ ...prev, loading: !prev.loading }));
    }

    const handleEditCate = async (id: number) => {
        const cate = fetchApiGetCate(id);
        console.log(cate);
        

    }

    const fetchApiGetCate = async (id: number) => {
        setState(prev => ({ ...prev, loading: !prev.loading }));
        try {
            const res = await apiGetOneCate(id);
            if (res) {
                setState(prev => ({ ...prev, loading: !prev.loading }));
                return res;
            }
        } catch (error) {
            console.log(error);
            messageAlert('error', 'Sửa danh mục thất bại!')
        }
        setState(prev => ({ ...prev, loading: !prev.loading }));
    }

    const handleDeleteCate = async (id: number) => {
        try {
            setState(prev => ({ ...prev, loading: !prev.loading }));
            const res = await apiDeleteCate(id);
            if (res) {
                const newDataSource = dataSource?.filter(data => data.id !== id);
                setDataSource([...newDataSource!]);
                setState(prev => ({ ...prev, totalCate: state.totalCate - 1 }));
                messageAlert('success', "Xoá danh mục thành công!");
            }
        } catch (error) {
            console.log(error);
        }
        setState(prev => ({ ...prev, loading: !prev.loading }));
    }

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };


    const showDraw = () => {
        setState(prev => ({ ...prev, showDrawAdd: !state.showDrawAdd }));
    };

    const handlePageChange = (page: any, pageSize: any) => {
        setState(prev => ({...prev, pageIndex: page, pageSize, refresh: !state.refresh}));
      };

    return {
        state,
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
        normFile,
        handleDeleteCate,
        contextHolder,
        handleEditCate,
        handlePageChange
    }
}

export default useListCate;