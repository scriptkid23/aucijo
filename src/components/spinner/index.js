import React from 'react'
import './style.css'
export default function Spinner({loading}) {
    return (
        loading &&  <div class="spinner-border"></div>
    )
}
