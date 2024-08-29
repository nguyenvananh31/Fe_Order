import { useState } from "react"

export default function useListCate() {
    const [loading, setLoading] = useState<boolean>(false);

    

    return {
        loading
    }
}