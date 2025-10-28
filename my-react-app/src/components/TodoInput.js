import React, { useState } from 'react';

function TodoInput({ items, setItems }) {
    const [value, setValue] = useState('');

    const addItem = () => {
        setItems([...items, value]);
        setValue('');
        console.log('추가된 항목:', value);
    }

    return (
        <div>
            <input value={value} type="text" placeholder="할일을 입력해주세요." onChange={(event) => setValue(event.target.value)}/>
            <button onClick={addItem}>추가</button>
        </div>
    );
}

export default TodoInput;