import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PAGINATE_DEFAULT } from "../../../../constants/enum";
import { RoutePath } from "../../../../constants/path";
import useToast from "../../../../hooks/useToast";
import { IProduct } from "../../../../interFaces/product";
import { apiDelePro, apiGetPros, apiUpdateStatusPro } from "./product.service";
import { AutoCompleteProps } from "antd";
import useDebounce from "../../../../hooks/useDeBounce";

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
    textSearch?: string;
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
    search: false,
}

export default function useProduct() {

    const [state, setState] = useState<ISate>(initState);
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
    const debouncedSearch = useDebounce(state.textSearch?.trim() || '');
    const { contextHolder, showToast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (state.search) {
                    setState(prev => ({ ...prev, loadingSubmit: true }));
                }

                const conds: any = { page: state.pageIndex, per_page: state.pageSize };

                if (state.textSearch) {
                    conds.name = debouncedSearch;
                }

                const res = await apiGetPros(conds);

                if (state.search) {
                    setOptions(res.data.map(i => ({ value: `${i.id}`, label: i.name })))
                    setState(prev => ({ ...prev, loading: false, search: false, loadingSubmit: false }));
                } else {
                    setState(prev => ({ ...prev, data: res.data, loading: false, total: res.meta.total, search: false }));
                }
            } catch (error) {
                console.log(error);
                setState(prev => ({ ...prev, loading: false, search: false }))
                showToast('error', 'Có lỗi xảy ra!');
            }
        }
        fetchData();
    }, [state.refresh, debouncedSearch]);

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

    // handle thay đổi trạng thái 
    const handleChangeStatus = async (id: number) => {
        try {
            setState(prev => ({ ...prev, loadingSubmit: true }));
            const res = await apiUpdateStatusPro(id);
            showToast('success', (res.message == 'ẩn' ? 'Ẩn' : 'Hiện') + ' sản phẩm thành công!');
        } catch (error) {
            console.log(error);
            showToast('error', 'Có lỗi xảy ra!');
        }
        setState((prev) => ({ ...prev, loadingSubmit: false, refresh: !prev.refresh }));
    }

    const handleDelePro = async (id: number) => {
        try {
            setState(prev => ({ ...prev, loadingSubmit: true }));
            await apiDelePro(id);
            showToast('success', 'Xoá sản phẩm thành công!');
        } catch (error) {
            console.log(error);
            showToast('error', 'Có lỗi xảy ra!');
        }
        setState((prev) => ({ ...prev, loadingSubmit: false, refresh: !prev.refresh }));
    }

    //Search

    const handleChangeTextSearch = (value: string) => {
        setState(prev => ({ ...prev, textSearch: value, search: true }));
    }

    return {
        state,
        contextHolder,
        handlePageChange,
        handleToAdd,
        handleToEdit,
        handleChangeStatus,
        handleDelePro,
        options,
        setOptions,
        handleChangeTextSearch
    }
}