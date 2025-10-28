import React, { useState } from 'react';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';

function Todolist() {
    const [items, setItems] = useState([]);

    return (
        <main>
            <div>
                <h1>TodoList</h1>
            </div>
            <div>
                <TodoInput items={items} setItems={setItems} />
            </div>
            <div>
                {/* 방법 1: 삼항 연산자 */}
                {items.length > 0 ? (
                    <ul>
                        {items.map((item, index) => (
                            <TodoItem key={index} item={item} />
                        ))}
                    </ul>
                ) : (
                    <p>할 일이 없습니다.</p>
                )}
            </div>
        </main>
    );
}

export default Todolist;