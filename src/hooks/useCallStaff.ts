import { useState } from "react";
import localStorageUtils, { KeyStorage } from "../utils/local-storage.utils";
import { table } from "console";

const useCallStaff = () => {
    const [callStaff, setCallStaff] = useState<any>(() => {
        const callStaff = localStorageUtils.getObject(KeyStorage.CALLSTAFF);
        if (callStaff) {
            return callStaff;
        }
        return {list: []};
    });

    const setCallStaffToLocal = (table: any) => {
        if (table?.table_id?.length > 0) {
            const newCAll = callStaff?.list?.length > 0 ? [...callStaff?.list] : [];
            if (callStaff?.list?.length == 0 || !newCAll.some(i => i?.bill_id == table?.bill_id)) {
                newCAll.push(table);
            }
            localStorageUtils.setObject(KeyStorage.CALLSTAFF, { list: newCAll });
            setCallStaff((prev: any) => ({ ...prev, list: newCAll }));
        }
    };

    const deCrease = (tables: any[]) => {
        if (tables.length == 0) {
            return false;
        }
        const newCAll = callStaff?.list?.filter((i: any) => !tables.map(i => i?.bill_id).includes(i?.bill_id));
        if (newCAll.length == 0) {
            clearAllCall();
            setCallStaff((prev: any) => ({ ...prev, list: [] }));
        }else {
            localStorageUtils.setObject(KeyStorage.CALLSTAFF, { list: newCAll });
            setCallStaff((prev: any) => ({ ...prev, list: newCAll }));
        }
        return true;
    }

    const clearAllCall = () => {
        localStorageUtils.remove(KeyStorage.CALLSTAFF);
    }

    return { callStaff, setCallStaffToLocal, deCrease }
}

export default useCallStaff;