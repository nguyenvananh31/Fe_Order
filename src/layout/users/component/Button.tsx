import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Button = ({ states, title, fnc }) => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.button.state);

    const handleClick = () => {
        dispatch(toggleState()); // Cập nhật trạng thái khi nút được nhấn
        if (fnc) fnc(); // Gọi hàm fnc nếu có
    };

    const [state, setState] = useState(states);

    return (
        <button 
            className={`${state ? 'bg-mainColor1' : 'bg-mainColor2'} btn uppercase text-[16px] tracking-wider text-textColor3 rounded-md px-6 py-4 hidden md:block`} 
            onClick={fnc}
        >
            {title}
        </button>
    );
};

export default Button;
