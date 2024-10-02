import { message } from "antd";

const useToastMessage = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const showToast = (type: any, content: string) => {
        messageApi.open({
            type,
            content,
        });
    }

    return{
        contextHolder,
        showToast
    }
}

export default useToastMessage;