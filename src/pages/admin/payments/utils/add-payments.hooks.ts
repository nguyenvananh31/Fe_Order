import { Form } from "antd";
import { useState } from "react"



export default function useAddPayments() {
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();



    const onCreatePayments = async () => {
        const formData = new FormData();
        formData.append('name', form.getFieldValue('name'));
        formData.append('status', form.getFieldValue('status'));
        setLoading(true);
        try {
            
        } catch (error) {
            
        }
        setLoading(false);
    }



    return {
        loading,
        form,
        onCreatePayments,
    }
}