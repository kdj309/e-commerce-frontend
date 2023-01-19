import React from 'react';

export default function Alert({ alerttype, msg }) {
    return (
        <div className={`alert alert-${alerttype} alert-dismissible fade show`} role='alert'>
            {msg}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}
