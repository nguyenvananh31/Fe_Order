import { useState } from "react";

export default function useHeader() {
    const [open, setOpen] = useState<boolean>(false);

    const toggleDraw = () => {
        setOpen(!open);
    }
    
    return {
        open,
        toggleDraw
    }
}