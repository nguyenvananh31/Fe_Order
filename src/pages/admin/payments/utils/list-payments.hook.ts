import { Form, message,  } from "antd";
import { useEffect, useState } from "react";
import { IPaymentsRed } from "../../../../interFaces/payments";
import { apiCreatePayments, apiDeletePayments, apiGetOnePayments, apiGetPayments } from "./payments.sevices";




interface DataSource {
    id: number;
    name: string;
    status: boolean;
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

const useListPayments = () => {
    const [state, setState] = useState<IState>(initstate);
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>('');
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState<DataSource[] | null>(null);
    const [messageApi, contextHolder] = message.useMessage();

    //Lấy ra category
    useEffect(() => {
        ; (async () => {
            setState(prev => ({ ...prev, loading: !prev.loading }));
            try {
                const res = await apiGetPayments({ 
                    page: state.pageIndex,
                    pageSize: state.pageSize
                });
                if (res.data) {
                    const newDataSource: any = res.data.map(item => ({
                        id: item.id,
                        name: item.name,
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

    const onCreatePayments = async (values: IPaymentsRed) => {

        setState(prev => ({ ...prev, loading: !prev.loading }));
        try {
            const formData = new FormData();
            formData.append('name', values.name);
 
            const res = await apiCreatePayments(formData);
            if (res.data) {
                setDataSource(prev => ([
                    {
                        id: res.data.id!,
                        name: res.data.name,
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



    

   

 
    const messageAlert = (type: any, content: string) => {
        messageApi.open({
            type,
            content,
        });
    }



    const handleEditPayments = async (id: number) => {
        const payments = fetchApiGetPaymentsByID(id);
        console.log(payments);
        

    }

    const fetchApiGetPaymentsByID = async (id: number) => {
        setState(prev => ({ ...prev, loading: !prev.loading }));
        try {
            const res = await apiGetOnePayments(id);
            if (res) {
                setState(prev => ({ ...prev, loading: !prev.loading }));
                return res;
            }
        } catch (error) {
            console.log(error);
            messageAlert('error', 'Sửa thất bại!')
        }
        setState(prev => ({ ...prev, loading: !prev.loading }));
    }

    const handleDeletePayments = async (id: number) => {
        try {
            setState(prev => ({ ...prev, loading: !prev.loading }));
            const res = await apiDeletePayments(id);
            if (res) {
                const newDataSource = dataSource?.filter(data => data.id !== id);
                setDataSource([...newDataSource!]);
                setState(prev => ({ ...prev, totalCate: state.totalCate - 1 }));
                messageAlert('success', "Xoá  thành công!");
            }
        } catch (error) {
            console.log(error);
        }
        setState(prev => ({ ...prev, loading: !prev.loading }));
    }



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
        previewOpen,
        previewImage,
        setPreviewImage,
        setPreviewOpen,
        handleDeletePayments,
        contextHolder,
        handleEditPayments,
        handlePageChange,
        onCreatePayments
    }
}

export default useListPayments;