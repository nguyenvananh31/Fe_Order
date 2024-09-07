import { Form, message } from "antd";
import { useEffect, useState } from "react";
import { apiCreatePayments, apiDeletePayments, apiGetOnePayments, apiGetPayments } from "./payments.sevices";
import { IPayments } from "../../../../interFaces/payments";


interface DataSource {
    id: number;
    name: string;
    status: number;
}

interface IState {
    loading: boolean;
    showDrawAdd: boolean;
    totalPayments: number;
    pageIndex: number;
    pageSize: number;
    refresh: boolean;
}

const initstate: IState = {
    loading: false,
    showDrawAdd: false,
    totalPayments: 0,
    pageIndex: 1,
    pageSize: 5,
    refresh: false
};

const useListPayments = () => {
    const [state, setState] = useState<IState>(initstate);
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState<DataSource[] | null>(null);
    const [messageApi, contextHolder] = message.useMessage();

    // Lấy ra Paymentsgory
    useEffect(() => {
        (async () => {
            setState((prev) => ({ ...prev, loading: !prev.loading }));
            try {
                const res = await apiGetPayments({
                    page: state.pageIndex,
                    pageSize: state.pageSize,
                });
                if (res.data) {
                    const newDataSource: any = res.data.map((item) => ({
                        id: item.id,
                        name: item.name,
                        status: item.status,
                    }));
                    setDataSource(newDataSource);
                    setState((prev) => ({
                        ...prev,
                        totalPayments: res.meta.total,
                        pageIndex: res.meta.current_page,
                    }));
                }
            } catch (error) {
                console.log(error);
            }
            setState((prev) => ({ ...prev, loading: !prev.loading }));
        })();
    }, [state.refresh]);

    const messageAlert = (type: any, content: string) => {
        messageApi.open({
            type,
            content,
        });
    };

    const onCreatePayments = async (values: IPayments) => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('status', (values.status ?? 0).toString()); // Đặt giá trị mặc định là 0 nếu status là undefined hoặc null
            
            const res = await apiCreatePayments(formData);
            if (res.data) {
                setDataSource(prev => [
                    {
                        id: res.data.id ?? 0,
                        name: res.data.name,
                        status: res.data.status ?? 0, // Đặt giá trị mặc định là 0 nếu status là undefined
                    },
                    ...prev!,
                ]);
                form.resetFields();
                console.log(123);
                
                setState(prev => ({
                    ...prev,
                    showDrawAdd: false,
                    totalPayments: state.totalPayments + 1,
                }));
                messageAlert('success', 'Thêm thanh toán thành công!');
            }
        } catch (error: any) {
            console.error(error);
            messageAlert('error', 'Thêm thanh toán thất bại!');
        }
        setState(prev => ({ ...prev, loading: false }));
    };


    const handleEditPayments = async (id: number) => {
        const Payments = fetchApiGetPayments(id);
        console.log(Payments);
    };



    const fetchApiGetPayments = async (id: number) => {
        setState((prev) => ({ ...prev, loading: !prev.loading }));
        try {
            const res = await apiGetOnePayments(id);
            if (res) {
                setState((prev) => ({ ...prev, loading: !prev.loading }));
                return res;
            }
        } catch (error) {
            console.log(error);
            messageAlert('error', 'Sửa danh mục thất bại!');
        }
        setState((prev) => ({ ...prev, loading: !prev.loading }));
    };

    const handleDeletePayments = async (id: number) => {
        try {
            setState((prev) => ({ ...prev, loading: !prev.loading }));
            const res = await apiDeletePayments(id);
            if (res) {
                const newDataSource = dataSource?.filter((data) => data.id !== id);
                setDataSource([...newDataSource!]);
                setState((prev) => ({ ...prev, totalPayments: state.totalPayments - 1 }));
                messageAlert('success', 'Xoá danh mục thành công!');
            }
        } catch (error) {
            console.log(error);
        }
        setState((prev) => ({ ...prev, loading: !prev.loading }));
    };

    const showDraw = () => {
        setState((prev) => ({ ...prev, showDrawAdd: !state.showDrawAdd }));
    };

    const handlePageChange = (page: any, pageSize: any) => {
        setState((prev) => ({
            ...prev,
            pageIndex: page,
            pageSize,
            refresh: !state.refresh,
        }));
    };

    return {
        state,
        dataSource,
        showDraw,
        form,
        onCreatePayments,
        handleDeletePayments,
        contextHolder,
        handleEditPayments,
        handlePageChange,
    };
};

export default useListPayments;