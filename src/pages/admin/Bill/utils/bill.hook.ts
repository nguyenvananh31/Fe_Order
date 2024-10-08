import { AutoCompleteProps, TableProps } from "antd";
import { RadioChangeEvent } from "antd/lib";
import { useCallback, useEffect, useState } from "react";
import { PAGINATE_DEFAULT } from "../../../../constants/enum";
import useDebounce from "../../../../hooks/useDeBounce";
import useToastMessage from "../../../../hooks/useToastMessage";
import { IBill } from "../../../../interFaces/bill";
import { apiGetBils, apiUpdateStatusBill } from "./bill.service";

interface IState {
    loadingSubmit: boolean;
    loading: boolean;
    data: IBill[];
    pageSize: number;
    pageIndex: number;
    total: number;
    showModal: boolean;
    selectedItemId?: number;
    selectedStatus?: string;
    refresh: boolean;
    search: boolean;
    bill?: IBill;
    showModalStatus: boolean;
    loadingSearch: boolean;
    textSearch?: string;
    filtertatus?: boolean;
    filterDate?: string;
    enterSearch: boolean;
    filterSort?: string;
    filterOrderBy?: string;
}

const initState: IState = {
    loadingSubmit: false,
    loading: true,
    data: [],
    pageSize: PAGINATE_DEFAULT.LIMIT,
    pageIndex: 1,
    total: 0,
    showModal: false,
    refresh: false,
    search: false,
    showModalStatus: false,
    loadingSearch: false,
    textSearch: '',
    filtertatus: undefined,
    filterDate: undefined,
    enterSearch: false
}

export default function useBill() {

    const [state, setState] = useState<IState>(initState);
    const { showToast, contextHolder } = useToastMessage();
    const [status, setStatus] = useState<any>();
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
    const debouncedSearch = useDebounce(state.textSearch?.trim() || '');

    //Lấy bill
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
                    conds.ma_bill = debouncedSearch;
                }

                if (typeof state.filtertatus != 'undefined') {
                    conds.status = state.filtertatus;
                }

                if (state.filterDate) {
                    conds.order_date = state.filterDate;
                }

                if (!state.textSearch && state.search && !state.enterSearch) {
                    setState(prev => ({ ...prev, loading: false, search: false, loadingSearch: false }));
                    return;
                }

                if (state.filterOrderBy && state.filterSort) {
                    conds.sort_by = state.filterSort;
                    conds.orderby = state.filterOrderBy;
                }

                const res = await apiGetBils(conds);

                if (state.search && !state.enterSearch) {
                    setOptions(res.data.map(i => ({ value: `${i.id}`, label: i.ma_bill })))
                    setState(prev => ({ ...prev, loading: false, search: false, loadingSearch: false }));
                } else {
                    setState(prev => ({ ...prev, data: res.data, loading: false, total: res.meta.total, search: false, loadingSearch: false, enterSearch: false }));
                }
            } catch (error: any) {
                console.log(error);
                showToast('error', 'Có lỗi xảy ra!');
                setState((prev) => ({ ...prev, data: [], loading: false, total: 0 }));
            }
        }
        fetchData();
    }, [state.refresh, debouncedSearch]);

    // Chuyển trang và phân trang
    const handlePageChange = (page: any, pageSize: any) => {
        setState(prev => ({ ...prev, pageIndex: page, pageSize, refresh: !prev.refresh }));
    };


    // Dismis Modal
    const handleDismissModal = useCallback(() => {
        setState((prev) => ({
            ...prev,
            showModal: false,
            selectedItemId: undefined,
        }));
    }, []);

    // Hiển thị model
    const handleOpenModal = useCallback((item?: IBill) => {
        setState(prev => ({
            ...prev,
            showModal: true,
            selectedItemId: item?.id || 0,
            bill: item
        }))
    }, []);

    // Dismis Modal
    const handleDismissModalStatus = useCallback(() => {
        setState((prev) => ({
            ...prev,
            showModalStatus: false,
        }));
    }, []);

    // Hiển thị model
    const handleOpenModalStatus = useCallback((id: number, type?: string) => {
        setState(prev => ({
            ...prev,
            showModalStatus: true,
        }))
        setStatus({ id, type });
    }, []);

    const onChanegStatus = (e: RadioChangeEvent) => {
        setStatus((prev: any) => ({ ...prev, type: e.target.value }));
    };

    const handleChangeStatus = async () => {
        if (!status) return;
        setState({ ...state, loading: true });
        try {
            await apiUpdateStatusBill(status?.id, { status: status?.type });
            setState((prev) => ({ ...prev, refresh: !prev.refresh, showModalStatus: false }));
            showToast('success', 'Cập nhật trạng thái thành công!');
        } catch (error: any) {
            console.log(error);
            showToast('error', 'Có lỗi xảy ra!');
            setState((prev) => ({ ...prev, loading: false }));
        }
    }

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

    //Filter date
    const handleFilterDate = (_: any, dateString: any) => {
        if (!dateString) {
            setState(prev => ({ ...prev, filterDate: undefined, refresh: !prev.refresh, pageIndex: 1 }))
            return;
        }

        const filterDate = new Date(dateString).toISOString();

        setState(prev => ({ ...prev, filterDate , refresh: !prev.refresh, pageIndex: 1 }))
    }

    // làm mới data
    const refreshPage = useCallback(() => {
        setState((prev) => ({ ...initState, refresh: !prev.refresh }));
    }, []);

    const handleTableChange: TableProps<any>['onChange'] = (_: any, __: any, sorter: any) => {
        if (sorter) {
            setState(prev => {
                let rePage = false;
                if (
                    prev.filterOrderBy !== sorter?.order?.slice(0, sorter.order.length-3) ||
                    prev.filterSort !== sorter.field
                ) {
                    rePage = true;
                }
                return { ...prev, filterOrderBy: sorter.order ? sorter.order.slice(0, sorter.order.length-3) : undefined,
                     filterSort: sorter.field, refresh: !state.refresh, pageIndex: rePage ? 1 : prev.pageIndex
                }
            })
        }
    }

    return {
        state,
        contextHolder,
        status,
        options,
        showToast,
        handlePageChange,
        handleOpenModal,
        refreshPage,
        handleDismissModal,
        handleDismissModalStatus,
        handleOpenModalStatus,
        onChanegStatus,
        handleChangeStatus,
        handleChangeTextSearch,
        handleSearchBtn,
        handleFilterStatus,
        handleFilterDate,
        handleTableChange
    }
}