import { useCallback, useEffect, useState } from "react";
import { PAGINATE_DEFAULT } from "../../../../constants/enum";
import { useIsMobile } from "../../../../hooks/useIsMobile";
import useToast from "../../../../hooks/useToast";
import { ICate } from "../../../../interFaces/categories";
import { apiChangeStatus, apiDeleteCate, apiGetCates } from "./categories.service";
import { AutoCompleteProps } from "antd";
import useDebounce from "../../../../hooks/useDeBounce";


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
    loadingSearch: boolean;
    textSearch?: string;
    filtertatus?: boolean;
    filterDate?: string[];
    enterSearch: boolean;
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
    loadingSearch: false,
    textSearch: '',
    filtertatus: undefined,
    filterDate: undefined,
    enterSearch: false
}

const useCate = () => {
    const [state, setState] = useState<ISate>(initState);
    const isMobile = useIsMobile();
    const { showToast, contextHolder } = useToast();
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
    const debouncedSearch = useDebounce(state.textSearch?.trim() || '');

    useEffect(() => {
        //Lấy tất cả tài khoản
        const fetchData = async () => {
            try {
                if (state.search) {
                    setState(prev => ({ ...prev, loadingSearch: true }));
                } else {
                    setState(prev => ({ ...prev, loading: true }));
                }

                const conds: any = { page: state.pageIndex, per_page: state.pageSize };

                if (state.textSearch) {
                    conds.name = debouncedSearch;
                }

                if (typeof state.filtertatus != 'undefined') {
                    conds.status = state.filtertatus;
                }
                
                if (!state.textSearch && state.search && !state.enterSearch) {
                    setState(prev => ({ ...prev, loading: false, search: false, loadingSearch: false }));
                    return;
                }
                
                const res = await apiGetCates(conds);


                if (state.search && !state.enterSearch) {
                    setOptions(res.data.map(i => ({ value: `${i.id}`, label: i.name })))
                    setState(prev => ({ ...prev, loading: false, search: false, loadingSearch: false }));
                } else {
                    const cates = convertCategoryToTree(res.data);

                    setState(prev => ({ ...prev, data: cates || [], loading: false, total: res.meta.total, search: false, loadingSearch: false, enterSearch: false }));
                }
            } catch (error: any) {
                console.log(error);
                showToast('error', 'Có lỗi xảy ra!');
                setState((prev) => ({ ...prev, data: [], loading: false, total: 0 }));
            }
        }
        fetchData();
    }, [state.refresh, debouncedSearch]);

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

       //Search
    /** Event KeyEnter */
    useEffect(() => {
        
        const keyDownListener = (event: KeyboardEvent) => {
            if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                setState((prev) => ({ ...prev, pageIndex: 1, search: false, enterSearch: true, refresh: !prev.refresh }));
            }
        };
        document.addEventListener('keydown', keyDownListener);
        return () => {
            document.removeEventListener('keydown', keyDownListener);
        };
    }, []);

    //Search text
    const handleChangeTextSearch = (value: string) => {
        setOptions([]);
        setState(prev => ({ ...prev, textSearch: value, search: true }));
    }

    //Handle click btn search
    const handleSearchBtn = useCallback(() => {
        setState((prev) => ({ ...prev, pageIndex: 1, search: false, enterSearch: true, refresh: !prev.refresh }));
    }, []);

    //Filter status
    const handleFilterStatus = (value: boolean) => {
        setState(prev => ({ ...prev, filtertatus: value, refresh: !prev.refresh, pageIndex: 1 }));
    }

    // làm mới data
    const refreshPage = useCallback(() => {
        setState((prev) => ({ ...initState, refresh: !prev.refresh }));
    }, []);



    return {
        state,
        isMobile,
        contextHolder,
        options,
        refreshPage,
        handleDismissModal,
        handleOpenModal,
        handlePageChange,
        handleDeleteCate,
        showToast,
        handleChangeStatus,
        handleChangeTextSearch,
        handleSearchBtn,
        handleFilterStatus
    }
}

export default useCate;