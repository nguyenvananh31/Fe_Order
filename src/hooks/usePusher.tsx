import Pusher from "pusher-js";
import React, { createContext, useContext } from "react";


const pusher = new Pusher(`${import.meta.env.VITE_PUSHER_APP_KEY}`, {
    cluster: import.meta.env.VITE_PUSHER_CLUSTER || '',
    forceTLS: false,
});

const PusherContext = createContext(pusher);

export const usePusher = () => useContext(PusherContext);


const PusherProvider = ({ children }: any) => {
    return <PusherContext.Provider value={pusher}>{children}</PusherContext.Provider>;
};

export default React.memo(PusherProvider);