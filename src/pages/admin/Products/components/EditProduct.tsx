import { Breadcrumb, Button, Card, Col, Form, GetProp, Image, Input, Row, TreeSelect } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { RcFile } from "antd/es/upload";
import { Select, Upload, UploadFile, UploadProps } from "antd/lib";
import { apiGetSizes } from "../../Size/utils/size.service";
import { useCallback, useEffect, useState } from "react";
import { apiGetCates } from "../../Categories/utils/categories.service";
import useToast from "../../../../hooks/useToast";
import { ICate } from "../../../../interFaces/categories";
import { FileRule, getImageUrl } from "../../../../constants/common";
import { CloseOutlined, LeftOutlined, LoadingOutlined, PlusOutlined, RedoOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { apiGetOnePro, apiUpdatePro } from "../utils/product.service";
import { RoutePath } from "../../../../constants/path";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

interface IState {
    loading: boolean;
    loadingBtn: boolean;
    isEdit: boolean;
    cate: Omit<DefaultOptionType, 'label'>[];
    size: { label: string, value: string | number }[];
    refresh: boolean;
}

const initState: IState = {
    loading: true,
    loadingBtn: false,
    isEdit: false,
    cate: [],
    size: [],
    refresh: false,
}

export default function EditProduct() {

    const [state, setState] = useState<IState>(initState);
    const { contextHolder, showToast } = useToast();
    const [form] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [thumbnail, setThumbnail] = useState<UploadFile[]>([]);
    const [images, setImages] = useState<any[][]>([]);
    const { id: productId } = useParams();
    const navigate = useNavigate();

    //Lấy product theo id
    useEffect(() => {
        const fetchApi = async () => {
            try {
                setState(prev => ({ ...prev, loading: true }));
                const res = await apiGetOnePro(+productId!);
                if (res.data) {
                    const thumbnail: any = handleProcessImage(res.data.thumbnail);
                    setThumbnail(thumbnail);
                    form.setFieldsValue({
                        product_name: res.data.name,
                        category_id: res.data.category_id,
                        thumbnail,
                        variant: res.data.product_details.map(detail => ({
                            size_id: detail.size.id,
                            quantity: detail.quantity,
                            price: detail.price,
                            sale: detail.sale,
                            images: handleProcessImage(detail.images),
                        })),
                    });
                }
            } catch (error) {
                console.log(error);
                showToast('error', 'Có lỗi xảy ra!');
            }
        }
        setState(prev => ({ ...prev, loading: false, loadingBtn: false }));
        fetchApi();
    }, [state.refresh]);

    //Lấy cate
    useEffect(() => {
        const fetchApi = async () => {
            try {
                setState(prev => ({ ...prev, loading: true }));
                const res = await apiGetCates();
                if (res.data) {
                    setState(prev => ({ ...prev, loading: false, cate: convertCategories(res.data) }));
                }
            } catch (error) {
                console.log(error);
                showToast('error', 'Có lỗi xảy ra!');
            }
        }
        setState(prev => ({ ...prev, loading: false }));
        fetchApi();
    }, []);
    
    //Lấy size
    useEffect(() => {
        const fetchApi = async () => {
            try {
                setState(prev => ({ ...prev, loading: true }));
                const res = await apiGetSizes();
                if (res.data) {
                    const size: { label: string, value: string | number }[] = res.data.map(item => ({ label: item.name, value: item.id }));
                    setState(prev => ({ ...prev, loading: false, size }));
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
                value: cate.id,
                title: cate.name,
                isLeaf: cate.subcategory.length == 0,
            });

            // Đệ quy với danh mục con nếu có
            if (cate.subcategory.length > 0) {
                result = result.concat(convertCategories(cate.subcategory, cate.id));
            }
        });

        return result;
    };

    //Xử lý ảnh default
    const handleProcessImage = useCallback((files: any) => {
        if (files?.length == 0) {
            return [];
        }

        if (typeof files === 'string') {
            return [{
                uid: '-1',
                name: 'Ảnh 1',
                status: 'done',
                url: getImageUrl(files),
            }];
        }

        return files.map((img: string, index: number) => ({
            uid: `-${index + 1}`,
            name: `Ảnh ${index + 1}`,
            status: 'done',
            url: getImageUrl(img),
        }));
    }, []);

    //Handle upload
    const handleBeforeUpload = async (file: any, index?: number) => {

        if (!FileRule.accepts.includes(file.type)) {
            showToast('error', 'Chỉ được tải ảnh dạng JPG/PNG/JPEG!');
            return Upload.LIST_IGNORE;
        }

        if (index !== undefined) {
            setImages(prev => {
                const newImages = [...prev];
                if (!newImages[index]) {
                    newImages[index] = [];
                }
                newImages[index].push(file);
                return newImages;
            });
        } else {
            setState((prev) => ({ ...prev, loadingBtn: true }));
            setThumbnail([file]);
            setTimeout(async () => {
                setState((prev) => ({ ...prev, loadingBtn: false }));
            }, 1000);
        }

        return false;
    };


    const handlePreview = async (file: any) => {

        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const uploadButton = (
        <button type="button" className={`${!state.isEdit && 'cursor-not-allowed'} border-0 bg-none`}>
            {state.loadingBtn ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    //handle Edit
    const handleSubmit = () => {
        if (state.isEdit) {
            form.submit();
        }
        setState(prev => ({ ...prev, isEdit: true }));
    }

    const handleEdit = async (values: any) => {

        const formData = new FormData();
        formData.append('name', values.product_name);
        formData.append('category_id', values.category_id);
        formData.append('thumbnail', values.thumbnail[0].originFileObj as FileType);

        values.variant.forEach((variant: any, index: number) => {
            formData.append(`product_details[${index}][size_id]`, variant.size_id)
            formData.append(`product_details[${index}][price]`, variant.price)
            formData.append(`product_details[${index}][quantity]`, variant.quantity)
            formData.append(`product_details[${index}][sale]`, variant.sale)
            variant.images.forEach((item: any) => {
                formData.append(`product_details[${index}][images][][file]`, item.originFileObj as FileType)
            });
        });
        try {
            setState((prev) => ({ ...prev, loadingBtn: false }));
            const res = await apiUpdatePro(+productId! ,formData);

            if (res.data) {
                showToast('success', 'Thêm sản phẩm thành công!');
            }
        } catch (error) {
            showToast('error', 'Sửa sản phẩm thất bại!');
        }
        setState((prev) => ({ ...prev, loadingBtn: false }));
    }

    //Handle back list
    const backToList = useCallback(() => { navigate(`/${RoutePath.ADMIN}/${RoutePath.ADMIN_PRODUCT}`); }, []);

    //Handle làm lại
    const handleRefresh = useCallback(() => { setState(prev => ({ ...prev, refresh: !prev.refresh, loadingBtn: true })) }, []);

    return <>
        {contextHolder}
        <Breadcrumb
            style={{
                fontSize: "24px",
                margin: "16px 0 28px 0"
            }}
            items={[
                {
                    title: 'Dashboard',
                },
                {
                    title: <h1 className="font-bold">Chi tiết sản phẩm</h1>,
                },
            ]}
        />
        <div className='bg-primary drop-shadow-primary rounded-primary'>
            <div className='flex items-center justify-end px-4 py-6 gap-4'>
                <Button
                    icon={<RedoOutlined />}
                    type='default'
                    onClick={handleRefresh}
                    loading={state.loadingBtn}
                >
                    Làm lại
                </Button>
                <Button
                    icon={<LeftOutlined />}
                    type='default'
                    onClick={backToList}
                >
                    Quay lại
                </Button>
            </div>
            <Form
                disabled={!state.isEdit}
                form={form}
                layout="vertical"
                onFinish={handleEdit}
                initialValues={{
                    variant: [{ quantity: 0, sale: 0 }]
                }}
            >
                <Row gutter={40} className="px-4">
                    <Col xs={24} md={12}>
                        <Form.Item
                            name={'product_name'}
                            label="Tên sản phẩm"
                            rules={[{ required: true, message: 'Tên sản phẩm không được bỏ trống!' }]}
                        >
                            <Input placeholder="Tên sản phẩm" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name={'category_id'}
                            label="Danh mục sản phẩm"
                            rules={[{ required: true, message: 'Danh mục sản phẩm không được bỏ trống!' }]}
                        >
                            <TreeSelect
                                treeDataSimpleMode
                                loading={state.loading}
                                style={{ width: '100%' }}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="Chọn danh mục"
                                treeData={state.cate}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name={'thumbnail'}
                            label="Ảnh sản phẩm"
                            rules={[{ required: true, message: 'Ảnh sản phẩm không được bỏ trống!' }]}
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <Upload
                                disabled={!state.isEdit}
                                listType="picture-card"
                                fileList={thumbnail}
                                onPreview={handlePreview}
                                beforeUpload={(file) => handleBeforeUpload(file)}
                            >
                                {thumbnail.length > 0 ? null : uploadButton}
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.List name="variant">
                    {(fields, { add, remove }) => (
                        <div className="flex gap-4 flex-col px-4">
                            {fields.map((field, index) => (
                                <Card
                                    size="small"
                                    title={`Sản phẩm ${field.name + 1}`}
                                    key={field.key}
                                    extra={
                                        <CloseOutlined
                                            onClick={() => {
                                                if (!state.isEdit) return;
                                                remove(field.name);
                                            }}
                                        />
                                    }
                                >
                                    <Row gutter={40} className="px-4">
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Kích thước"
                                                name={[field.name, 'size_id']}
                                                rules={[{ required: true, message: 'Kích thước sản phẩm không được bỏ trống!' }]}
                                            >
                                                <Select
                                                    disabled={!state.isEdit}
                                                    loading={state.loading}
                                                    showSearch
                                                    placeholder="Chọn kích thước"
                                                    style={{ width: '100%' }}
                                                    optionFilterProp="label"
                                                    options={state.size}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Số lượng"
                                                name={[field.name, 'quantity']}
                                                rules={[
                                                    { required: true, message: 'Số lượng sản phẩm không được bỏ trống!' },
                                                    {
                                                        validator: (_, value) => {
                                                            if (value < 1) {
                                                                return Promise.reject('Số lượng phải lớn hơn 0!');
                                                            }
                                                            return Promise.resolve();
                                                        }
                                                    }
                                                ]}
                                            >
                                                <Input placeholder="Nhập số lượng" type="number" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Giá"
                                                name={[field.name, 'price']}
                                                rules={[
                                                    { required: true, message: 'Giá sản phẩm không được bỏ trống!' },
                                                    {
                                                        validator: (_, value) => {
                                                            if (value < 0) {
                                                                return Promise.reject('Giá không thể là số âm!');
                                                            }
                                                            return Promise.resolve();
                                                        }
                                                    }
                                                ]}
                                            >
                                                <Input placeholder="Nhập giá" type="number" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Giảm giá"
                                                name={[field.name, 'sale']}
                                                rules={[
                                                    { required: true, message: 'Giảm giá sản phẩm không được bỏ trống!' },
                                                    {
                                                        validator: (_, value) => {
                                                            if (value < 0) {
                                                                return Promise.reject('Giảm giá không thể là số âm!');
                                                            }
                                                            return Promise.resolve();
                                                        }
                                                    }
                                                ]}
                                            >
                                                <Input placeholder="Nhập giảm giá" type="number" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item
                                                name={[field.name, 'images']}
                                                label="Ảnh sản phẩm"
                                                rules={[{ required: true, message: 'Ảnh sản phẩm không được bỏ trống!' }]}
                                                valuePropName="fileList"
                                                getValueFromEvent={normFile}
                                            >
                                                <Upload
                                                    disabled={!state.isEdit}
                                                    listType="picture-card"
                                                    fileList={images[index] || []}
                                                    onPreview={handlePreview}
                                                    beforeUpload={(file) => handleBeforeUpload(file, index)}
                                                    multiple
                                                >
                                                    {images[index]?.length > 10 ? null : uploadButton}
                                                </Upload>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Card>
                            ))}

                            <Button type="dashed" onClick={() => add()} block>
                                + Thêm sản phẩm biến thể
                            </Button>
                        </div>
                    )}
                </Form.List>
                <Form.Item>
                    <Button disabled={false} onClick={handleSubmit} type="primary" className="float-end my-6 mx-4">
                        {state.isEdit ? 'Lưu' : 'Cập nhật'}
                    </Button>
                    <Button disabled={false} onClick={backToList} className="float-end my-6">
                        Huỷ
                    </Button>
                </Form.Item>
            </Form>
        </div>
        {/* Show ảnh */}
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
    </>
}