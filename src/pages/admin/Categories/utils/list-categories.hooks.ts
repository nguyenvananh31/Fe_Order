import { Form, GetProp, message, Upload, UploadFile, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { ICateReq } from "../../../../interFaces/categories";
import { apiCreateCate, apiDeleteCate, apiGetCate, apiGetOneCate, apiUpdateCate } from "./categories.services";
import { FileRule, getImageUrl } from "../../../../constants/common";
import { RcFile } from "antd/es/upload";

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
    isEdit: number;
}

const initstate: IState = {
    loading: false,
    showDrawAdd: false,
    totalCate: 0,
    pageIndex: 1,
    pageSize: 5,
    refresh: false,
    isEdit: 0,
}

const useListCate = () => {
    const [state, setState] = useState<IState>(initstate);
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string | undefined>('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    //Lấy ra category
    useEffect(() => {
        ; (async () => {
            setState(prev => ({ ...prev, loading: !prev.loading }));
            try {
                const res = await apiGetCate({
                    page: state.pageIndex,
                    per_page: state.pageSize
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

    const handleBeforeUpload = async (file: any) => {
        if (!FileRule.accepts.includes(file.type)) {
            messageAlert('error', 'Định dạng hình ảnh không hợp lệ, vui lòng chọn hình ảnh khác');
            return Upload.LIST_IGNORE;
        }

        return false;
    };

    const onCreateCate = async (values: ICateReq) => {
        if (fileList?.length > 1) {
            messageAlert('error', "Hình ảnh không được lớn hơn 1 ảnh!");
            return;
        }
        setState(prev => ({ ...prev, loading: !prev.loading }));
        console.log(values);

        const formData = new FormData();
        formData.append('name', values.name);
        if (values.description) formData.append('description', values.description);
        if (!!fileList) {
            fileList.forEach((item) => formData.append('image', item.originFileObj as any));
        }
        try {
            let res;
            if (state.isEdit !== 0) {
                res = await apiUpdateCate(state.isEdit, formData);
            } else {
                res = await apiCreateCate(formData);
            }
            if (res.data) {
                form.resetFields();
                setState(prev => ({ ...prev, showDrawAdd: !state.showDrawAdd, refresh: !prev.refresh, isEdit: 0 }));
                messageAlert('success', `${state.isEdit ? 'Sửa' : 'Thêm'} danh mục thành công!`);
            }

        } catch (error: any) {
            console.log(error);
            messageAlert('error', `${state.isEdit ? 'Sửa' : 'Thêm'} danh mục thất bại!`);
        }
        setState(prev => ({ ...prev, loading: !prev.loading, isEdit: 0 }));
    }

    const handleEditCate = async (id: number) => {
        const { category: cate }: any = await fetchApiGetCate(id);
        if (!cate) {
            messageAlert('error', 'Danh mục không tồn tại!');
            return;
        }
        if (cate.image) {
            setFileList([{
                uid: '-1',
                name: 'default.png',
                status: 'done',
                url: getImageUrl(cate.image),
            }])
        }
        form.setFieldsValue(cate);
        setState(prev => ({
            ...prev,
            showDrawAdd: true,
            isEdit: id,
        }));
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
                setState(prev => ({ ...prev, refresh: !prev.refresh }));
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
        if (!state.isEdit) {
            form.resetFields();
            setFileList([]);
        }
        setState(prev => ({ ...prev, showDrawAdd: !state.showDrawAdd, isEdit: 0 }));
    };

    const handlePageChange = (page: any, pageSize: any) => {
        setState(prev => ({ ...prev, pageIndex: page, pageSize, refresh: !state.refresh }));
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
        handlePageChange,
        handleBeforeUpload
    }
}

export default useListCate;