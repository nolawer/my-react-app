import React from 'react';

function Box({text, color}) {

    return (
        <div className="box" style={{ backgroundColor: color }}>
            {text}
        </div>
    );
}

export default Box;