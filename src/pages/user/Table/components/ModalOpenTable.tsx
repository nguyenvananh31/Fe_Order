import { Checkbox, Pagination, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import BaseModalSetting from "../../../../components/base/BaseModalSetting";
import { apiGetTableClient } from "../utils/table.service";
import { EStatusTable } from "../../../../constants/enum";

interface IProps {
    onCancel: () => void;
    onConfirm: (table_ids: any[]) => () => void;
}

interface IState {
    loading: boolean;
    refresh: boolean;
    pageSize: number;
    pageIndex: number;
    totalTable: number;
    dataTable: any[];
    options: any[];
}

const initState: IState = {
    loading: true,
    refresh: false,
    pageSize: 15,
    pageIndex: 1,
    totalTable: 0,
    dataTable: [],
    options: [],
}

const ModalOpenTable = ({ onCancel, onConfirm }: IProps) => {

    const [state, setState] = useState<IState>(initState);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setState(prev => ({ ...prev, loading: true }));
                let conds = {
                    page: state.pageIndex,
                    per_page: state.pageSize
                }
                const res = await apiGetTableClient(conds);
                setState(prev => ({ ...prev, loading: false, dataTable: res.data.data, totalTable: res.data.total }));
            } catch (error) {
                console.log(error);
                setState(prev => ({ ...prev, loading: false }));
            }
        }
        fetchData();
    }, [state.pageIndex, state.pageSize, state.refresh]);

    const handleChangePage = useCallback((page: number) => {
        setState(prev => ({ ...prev, pageIndex: page, refresh: !prev.refresh }));
    }, []);

    const handleChooseTable = useCallback((options: any[]) => {
        setState(prev => {
            const newData = [...prev.dataTable.map(i => i.id)];
            const newOptions = prev.options.filter(i => !newData.includes(i));
            return { ...prev, options: newOptions.concat(options) };
        });
    }, []);

    return <BaseModalSetting
        title={'Chọn bàn cần mở'}
        onCancel={onCancel}
        onConfirm={onConfirm(state.options)}
        okText={'Mở bàn'}
    >
        <>
            <div className="customer-checkbox">
                {
                    state.dataTable.length > 0 && (
                        <Checkbox.Group className="w-full" onChange={handleChooseTable}>
                            {
                                state.dataTable.map((i, index) => (
                                    <Checkbox disabled={i.reservation_status == EStatusTable.OPEN} value={i.id} key={i.id}><span className="line-clamp-1 w-16">{i?.table || `Bàn ${index + 1}`}</span></Checkbox>
                                ))
                            }
                        </Checkbox.Group>
                    )
                }
            </div>
            {
                state.loading &&
                <div className='flex justify-center items-center min-h-20'>
                    <Spin />
                </div>
            }
            <Pagination
                current={state.pageIndex}
                pageSize={state.pageSize}
                total={state.totalTable}
                onChange={handleChangePage}
                align="center"
            />
        </>
    </BaseModalSetting>
}

export default ModalOpenTable;