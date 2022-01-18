import React, { useEffect, useState } from 'react';

const PAGE_SIZE = 15;

export default ({styleId}) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalReviews, setTotalReviews] = useState(0);

    const fetchReviews = (styleId) => {
        fetch(`/getReviewsByProduct/${styleId}?page=${page}&size=${PAGE_SIZE}`).then(response => {
            setData([...data, ...response.reviews]);
            if (!totalReviews) {
                setTotalReviews(response.reviewsMetaData.reviewCount);
            }
        });
    };

    useEffect(() => {
        setPage(1);
        setTotalReviews(0);
        fetchReviews(styleId);
    }, [styleId]);

    return <div>
        Reviews for style id {styleId}
        {data.toString()}
    </div>;
}