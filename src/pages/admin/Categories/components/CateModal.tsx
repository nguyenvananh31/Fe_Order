import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, GetProp, Image, Input, Modal, Spin, TreeSelect, Upload, UploadFile, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { FileRule, getImageUrl } from "../../../../constants/common";
import { ICate } from "../../../../interFaces/categories";
import { apiCreateCate, apiGetCates, apiGetOneCate, apiUpdateCate } from "../utils/categories.service";
import { DefaultOptionType } from "antd/es/select";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

interface IProps {
    itemId?: number;
    onRefresh: () => void;
    onClose: () => void;
    showToast: (type: string, message: string) => void;
}

interface IState {
    loading: boolean;
    loadingBtn: boolean;
    isEdit: boolean;
    data: Omit<DefaultOptionType, 'label'>[];
    cate?: ICate;
}

const initState: IState = {
    loading: true,
    loadingBtn: false,
    isEdit: false,
    data: [],
}

export default function CateModel({ onClose, onRefresh, showToast, itemId = undefined }: IProps) {

    const [state, setState] = useState<IState>(initState);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewImage, setPreviewImage] = useState<string | undefined>('');
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>('Không có danh mục cha');

    useEffect(() => {
        if (!itemId) {
            setState(prev => ({ ...prev, isEdit: true, loading: false }));
            return;
        }
        const fetchApi = async () => {
            try {
                const res = await apiGetOneCate(itemId!);
                if (res.data) {
                    setState(prev => ({ ...prev, loading: false, cate: res.data }));
                    form.setFieldsValue(res.data);
                    if (res.data.image) {
                        setFileList([{
                            uid: '-1',
                            name: 'default.png',
                            status: 'done',
                            url: getImageUrl(res.data.image),
                        }]);
                    }
                }
            } catch (error) {
                console.log(error);
                showToast('error', 'Có lỗi xảy ra!');
            }
        }
        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setState(prev => ({ ...prev, loading: true }));
                const res = await apiGetCates();
                if (res.data) {
                    setState(prev => ({ ...prev, loading: false, data: convertCategories(res.data) }));
                }
            } catch (error) {
                console.log(error);
                showToast('error', 'Có lỗi xảy ra!');
            }
        }
        setState(prev => ({ ...prev, loading: false }));
        fetchApi();
    }, []);

    // Hàm đệ quy chuyển đổi dữ liệu cây danh mục
    const convertCategories = (categories: ICate[], parentId = 0) => {
        let result: Omit<DefaultOptionType, 'label'>[] = [];

        categories.forEach((cate) => {
            // Thêm danh mục hiện tại vào kết quả
            result.push({
                id: cate.id,
                pId: parentId,
                value: String(cate.id),
                title: cate.name,
                isLeaf: cate.subcategory.length == 0,
                disabled: cate.id === itemId || itemId,
                selected: cate.id === itemId,
            });

            // Đệ quy với danh mục con nếu có
            if (cate.subcategory.length > 0) {
                result = result.concat(convertCategories(cate.subcategory, cate.id));
            }
        });

        return result;
    };

    // handle submit form và cập nhật
    const handleSubmit = () => {
        if ((itemId && state.isEdit) || !itemId) {
            form.submit();
            return;
        }
        setState(prev => ({ ...prev, isEdit: true }));
    }

    const onFinish = async (values: any) => {
        try {
            setState(prev => ({ ...prev, loadingBtn: true }));
            const formData = new FormData();
            formData.append('name', values.name);
            if (values.parent_id) {
                formData.append('parent_id', values.parent_id);
            }
            
            if (fileList[0]?.originFileObj) {
                fileList.forEach((item) => formData.append('image', item.originFileObj as any));
            }
            console.log(fileList);
            if (itemId) {
                await apiUpdateCate(itemId, formData, '_method=PUT');
            } else {
                await apiCreateCate(formData);
            }
            showToast('success', `${itemId ? 'Cập nhật' : 'Thêm'} danh mục thành công!`);
            onClose();
            onRefresh();
        } catch (error) {
            console.log(error);
            showToast('error', `${itemId ? 'Cập nhật' : 'Thêm'} danh mục thất bại!`);
        }
        setState(prev => ({ ...prev, loadingBtn: false }));
    }

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const handleBeforeUpload = async (file: any) => {
        if (!FileRule.accepts.includes(file.type)) {
            showToast('error', 'Định dạng hình ảnh không hợp lệ, vui lòng chọn hình ảnh khác');
            return Upload.LIST_IGNORE;
        }

        return false;
    };

    return (
        <>
            <Modal
                loading={state.loading}
                open={true}
                onCancel={onClose}
                onOk={handleSubmit}
                okText={
                    <div>
                        {
                            state.loadingBtn && (
                                <Spin indicator={<LoadingOutlined spin />} size="small" />
                            )
                        }
                        {itemId ? state.isEdit ? 'Lưu' : 'Cập nhật' : 'Tạo'}
                    </div>
                }
                cancelText='Huỷ'
                centered
                title={
                    <div className="text-primary">
                        {itemId ? state.isEdit ? 'Sửa' : 'Chi tiết' : 'Tạo'} tài khoản
                    </div>
                }
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                    disabled={!state.isEdit}
                    layout="vertical"
                >
                    <Form.Item
                        label={(
                            <div className='font-bold'>
                                Tên danh mục
                            </div>
                        )}
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng không để trống tên!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='parent_id'
                    >
                        <TreeSelect
                            treeDataSimpleMode
                            style={{ width: '100%' }}
                            value={value}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Chọn danh mục cha"
                            onChange={(newValue: string) => setValue(newValue)}
                            treeData={state.data}
                        />
                    </Form.Item>
                    <Form.Item label={(
                        <div className='font-bold'>
                            Hình ảnh mô tả
                        </div>
                    )}
                        valuePropName="fileList" getValueFromEvent={normFile}
                    >
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            accept={FileRule.accepts}
                            beforeUpload={handleBeforeUpload}
                        >
                            {fileList?.length >= 1 ? null : 
                                (
                                    <button style={{ border: 0, background: 'none' }} type="button">
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </button>
                                )
                            }
                        </Upload>
                        {previewImage && (
                            <Image
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}