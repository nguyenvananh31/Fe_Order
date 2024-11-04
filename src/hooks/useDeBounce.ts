import { useEffect, useState } from "react";

export default function useDebounce(value: any | undefined, delay: number = 500) {

    if (!value) {
        return undefined;
    }
    
    const [debouncedSearch, setDebounceSearch] = useState<any>(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceSearch(value);
        }, delay);

        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedSearch;
}