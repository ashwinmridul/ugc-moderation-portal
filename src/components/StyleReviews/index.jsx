import React, { useState } from 'react';

export default ({styleId}) => {
    const [data, setData] = useState([]);

    return <div>Reviews for style id {styleId}</div>;
}