import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PAGINATE_DEFAULT } from "../../../../constants/enum";
import { RoutePath } from "../../../../constants/path";
import useToast from "../../../../hooks/useToast";
import { IProduct } from "../../../../interFaces/product";
import { apiGetPros } from "./product.service";

interface ISate {
    loadingSubmit: boolean;
    loading: boolean;
    data: IProduct[];
    pageSize: number;
    pageIndex: number;
    total: number;
    showModal: boolean;
    selectedItemId?: number;
    selectedStatus?: string;
    refresh: boolean;
    search: boolean;
}

const initState: ISate = {
    loadingSubmit: false,
    loading: true,
    data: [],
    pageSize: PAGINATE_DEFAULT.LIMIT,
    pageIndex: 1,
    total: 0,
    showModal: false,
    refresh: false,
    search: false
}

export default function useProduct() {

    const [state, setState] = useState<ISate>(initState);
    const { contextHolder, showToast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiGetPros({ page: state.pageIndex, per_page: state.pageSize });

                setState(prev => ({ ...prev, data: res.data, loading: false, total: res.meta.total }));
            } catch (error) {
                console.log(error);
                setState(prev => ({ ...prev, loading: false }))
                showToast('error', 'Có lỗi xảy ra!');
            }
        }
        fetchData();
    }, [state.refresh]);

    //Handle chuyển trang add sản phẩm
    const handleToAdd = useCallback(() => {
        navigate(`/${RoutePath.ADMIN}/${RoutePath.ADMIN_ADD_PRODUCT}`);
    }, []);

    //Handle chuyển trang add sản phẩm
    const handleToEdit = useCallback((id: number) => {
        navigate(`/${RoutePath.ADMIN}/${RoutePath.ADMIN_EDIT_PRODUCT}/${id}`);
    }, []);

    // Chuyển trang và phân trang
    const handlePageChange = (page: any, pageSize: any) => {
        setState(prev => ({ ...prev, pageIndex: page, pageSize, refresh: !state.refresh }));
    };

    return {
        state,
        contextHolder,
        handlePageChange,
        handleToAdd,
        handleToEdit
    }
}