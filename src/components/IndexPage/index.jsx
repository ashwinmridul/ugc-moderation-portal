import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import UserReviews from '../UserReviews';
import StyleReviews from '../StyleReviews';
import { MainContainer, SearchBar } from './styles';

const REVIEW_BY = {
    USER: 'user',
    STYLE: 'style'
};

const IndexPage = () => {
    const [reviewBy, setReviewBy] = useState(REVIEW_BY.USER);
    const [inputText, setInputText] = useState('');
    const [showData, setShowData] = useState(false);

    const onChangeType = (event) => {
        setReviewBy(event.target.value);
        setInputText('');
        setShowData(false);
    };

    const fetchReviews = () => {
        if (inputText && inputText.length)
            setShowData(true);
    };

    const onChangeInput = (event) => {
        setShowData(false);
        setInputText(event.target.value);
    };

    return (<MainContainer>
        <Box
            component="form"
            noValidate
            autoComplete="off"
            >
            <FormControl>
                <FormLabel id="get-reviews-by-group-label">Get Reviews by</FormLabel>
                <RadioGroup
                row
                aria-labelledby="get-reviews-by-group-label"
                name="radio-buttons-group"
                onChange={onChangeType}
                value={reviewBy}
                >
                    <FormControlLabel value={REVIEW_BY.USER} control={<Radio />} label="User id" />
                    <FormControlLabel value={REVIEW_BY.STYLE} control={<Radio />} label="Style id" />
                </RadioGroup>
            </FormControl>
            <SearchBar value={inputText} onChange={onChangeInput} label={reviewBy === REVIEW_BY.USER ? 'Enter uidx' : 'Enter style id'} variant="standard" />
            <Button onClick={fetchReviews} variant="contained">Fetch Reviews</Button>
        </Box>
        {showData && (reviewBy === REVIEW_BY.USER ? <UserReviews uidx={inputText} /> : <StyleReviews styleId={inputText} />)}
    </MainContainer>);
};

export default IndexPage;