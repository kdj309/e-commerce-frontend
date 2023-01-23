import React, { useRef } from 'react'

export default function Alert({ cls, msg }) {
    const btn = useRef(
    )
    return (
        <div className={`alert alert-${cls} alert-dismissible fade show my-2`} role="alert">
            <strong>{msg}</strong>
            <button ref={btn} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}
