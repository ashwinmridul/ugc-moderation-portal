import React, { useEffect, useState } from 'react';

export default ({uidx}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`/getReviewsByUser/${uidx}`).then(response => setData(response));
    }, [uidx]);

    return <div>Reviews for user {uidx}</div>;
}