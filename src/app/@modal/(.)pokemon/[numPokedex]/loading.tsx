import React from 'react';

function Loading() {
    return (
        <div className={"fixed top-0 left-0 w-full h-full bg-blue/50 flex items-center justify-center z-50"}>
            <div className={"bg-white p-8 rounded-lg shadow-lg animate-pulse w-120 h-180"}></div>
        </div>
    );
}

export default Loading;