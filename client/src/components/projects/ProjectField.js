import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
    return(
        <div className="form-group">
            <label >{label}</label>
            <input className="form-control" {...input} />
            <div>{touched && error}</div>
        </div>
    );
};