import React from 'react';
import { useState } from "react";

function Test({name}) {
    // const name = "정성훈";
    return <h1>Hello {name} React World</h1>;
}

function Test2() {
    return (
        <div>
            <h1>Hello React World</h1>
            <Test name="정성훈" />
            <Test name="홍길동" />
            <Test name="이순신" />
        </div>
    );
}

function Test3() {
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(1);

    const incrementCount = () => {
        setCount(count + 1);
    };

    const incrementCount2 = () => {
        setCount2(count2 + 2);
    };

    return (
        <div>
            <div>
                <h1>Count: {count}</h1>
                <button onClick={incrementCount}>Increment</button>
            </div>
            
            <div>
                <h1>Count2: {count2}</h1>
                <button onClick={incrementCount2}>Increment</button>
            </div>
        </div>
    );
}

function Test4() {
    const handleClick = () => {
        alert('Button clicked');
    };
    return <button onClick={handleClick}>Click me</button>;
}

function Test5() {
    const [isLogin, setIsLogin] = useState(false);
    return (
        <div>
            {isLogin ? <p>안녕하세요!</p> : <p>로그인 해주세요.</p>}
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? '로그아웃' : '로그인'}
            </button>
        </div>
    );
}

function Test6() {
    const [items, setItems] = useState([]);
    const [list, setList] = useState([]);


    const addItem = () => {
        setList([...list, items]);
        setItems('');
    };
    return (
        <div>
            <h1>이름 목록</h1>
            <input value={items} onChange={(e) => setItems(e.target.value)} placeholder="이름을 입력해주세요."/>
            <button onClick={addItem}>추가</button>
            <ul>
                {list.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>


        </div>
    );
}

function Test7() {
    return (
        <div>
            <input type="text" placeholder="할일을 입력해주세요." onChange={(event) => console.log(event.target.value)}/>
            <button onClick={() => console.log('할일 추가')}>추가</button>
        </div>
    );
}

// 모든 컴포넌트를 개별적으로 export
export { Test, Test2, Test4, Test5, Test6, Test7 };
export default Test3;