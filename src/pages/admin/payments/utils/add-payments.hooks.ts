import { Form, } from "antd";
import { useState } from "react"

export default function useAddpayments() {
    const [loading, setLoading] = useState<boolean>(false);
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [form] = Form.useForm();

    const onCreatePayments = async () => {
        const formData = new FormData();
        formData.append('name', form.getFieldValue('name'));
        
        setLoading(true);
        setLoading(false);
    }
    return {
        loading,
        form,
        previewOpen,
        setPreviewOpen,
        onCreatePayments,
    }
}