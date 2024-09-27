import { InputRef } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { PAGINATE_DEFAULT } from "../../../../constants/enum";
import { useIsMobile } from "../../../../hooks/useIsMobile";
import useToast from "../../../../hooks/useToast";
import { ICate } from "../../../../interFaces/categories";
import { apiChangeStatus, apiDeleteCate, apiGetCates } from "./categories.service";


interface ISate {
    loadingSubmit: boolean;
    loading: boolean;
    data: ICate[];
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

const useCate = () => {
    const [state, setState] = useState<ISate>(initState);
    const [searchText, setSearchText] = useState<string>('');
    const inputSearchRef = useRef<InputRef>(null);
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const isMobile = useIsMobile();
    const { showToast, contextHolder } = useToast();

    useEffect(() => {
        //Lấy tất cả tài khoản
        const fetchData = async () => {
            setState({ ...state, loading: true });
            try {
                const res = await apiGetCates({ page: state.pageIndex, per_page: state.pageSize });
                if (res.data) {
                    const cates = convertCategoryToTree(res.data);
                    
                    setState({ ...state, data: cates || [], loading: false, total: res.meta.total });
                }
            } catch (error: any) {
                console.log(error);
                showToast('error', 'Có lỗi xảy ra!');
                setState((prev) => ({ ...prev, data: [], loading: false, total: 0 }));
            }
        }
        fetchData();
    }, [state.refresh]);

    // Hàm đệ quy chuyển đổi dữ liệu danh mục
    const convertCategoryToTree = (categories: any[]): any[] => {
        return categories.map(category => {
          const { id, name, image, status, parent_id, name_parent, subcategory, created_at, updated_at } = category;
      
          const children = subcategory && subcategory.length > 0 ? convertCategoryToTree(subcategory) : [];
          
          return {
            id,
            name,
            image,
            status,
            parent_id,
            name_parent,
            created_at,
            updated_at,
            children // Thay subcategory bằng children
          };
        });
      };

    // handle xoá danh mục
    const handleDeleteCate = async (id: number) => {
        try {
            setState(prev => ({ ...prev, loadingSubmit: true }));
            await apiDeleteCate(id);
            showToast('success', 'Xoá danh mục thành công!');
        } catch (error) {
            console.log(error);
            showToast('error', 'Có lỗi xảy ra!');
        }
        setState((prev) => ({ ...prev, loadingSubmit: false, refresh: !prev.refresh }));
    }

    // handle thay đổi trạng thái 
    const handleChangeStatus = async (id: number, status: boolean) => {
        try {
            setState(prev => ({ ...prev, loadingSubmit: true }));
            const res = await apiChangeStatus(id, { status: !status });
            showToast('success', res.message);
        } catch (error) {
            console.log(error);
            showToast('error', 'Có lỗi xảy ra!');
        }
        setState((prev) => ({ ...prev, loadingSubmit: false, refresh: !prev.refresh }));
    }

    // làm mới data
    const refreshPage = useCallback(() => {
        setSearchText('');
        setState((prev) => ({ ...initState, refresh: !prev.refresh }));
        setSelectedStatus('');
    }, []);

    // Dismis Modal
    const handleDismissModal = useCallback(() => {
        setState((prev) => ({
            ...prev,
            showModal: false,
            selectedItemId: undefined,
        }));
    }, []);

    // Hiển thị model
    const handleOpenModal = useCallback((itemId?: number) => {
        setState(prev => ({
            ...prev,
            showModal: true,
            selectedItemId: itemId || 0
        }))
    }, []);

    // Chuyển trang và phân trang
    const handlePageChange = (page: any, pageSize: any) => {
        setState(prev => ({ ...prev, pageIndex: page, pageSize, refresh: !state.refresh }));
    };


    return {
        state,
        isMobile,
        contextHolder,
        refreshPage,
        handleDismissModal,
        handleOpenModal,
        handlePageChange,
        handleDeleteCate,
        showToast,
        handleChangeStatus
    }
}

export default useCate;