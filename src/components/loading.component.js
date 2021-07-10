import React from 'react'

export default function LoadingComponent({title}) {
    return (
        <div className="loading-component">
            <div class="loader">
                <div class="dot dot1"></div>
                <div class="dot dot2"></div>
                <div class="dot dot3"></div>
                <div class="dot dot4"></div>
                <div class="dot dot5"></div>
                </div>
                <p className="m-3">{title}</p>
        </div>
    )
}
