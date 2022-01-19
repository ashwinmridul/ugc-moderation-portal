import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import UserReviews from '../UserReviews';
import StyleReviews from '../StyleReviews';
import { SearchBar } from './styles';
import TopBar from '../TopBar';
import Container from '@mui/material/Container';
import Search from '@mui/icons-material/Search';

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
        if (inputText && inputText.length) {
            setShowData(false);
            setTimeout(() => setShowData(true), 100);
        }
    };

    const onChangeInput = (event) => {
        setShowData(false);
        setInputText(event.target.value);
    };

    const onKeyPress = (event) => {
        if (event.charCode === 13)
            fetchReviews();
    };

    return (<div>
        <TopBar />
        <Container maxWidth={false} sx={{paddingTop: 3, paddingBottom: 3}}>
            <Box
                component="div"
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
                <FormControl sx={{marginLeft: 3}} variant="standard">
                    <InputLabel htmlFor="search-bar">{reviewBy === REVIEW_BY.USER ? 'Enter uidx' : 'Enter style id'}</InputLabel>
                    <SearchBar
                        id="search-bar"
                        value={inputText}
                        onChange={onChangeInput}
                        onKeyPress={onKeyPress}
                        endAdornment={
                            <InputAdornment position="end">
                                <Icon><Search /></Icon>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Box>
        </Container>
        {showData && (reviewBy === REVIEW_BY.USER ? <UserReviews uidx={inputText} /> : <StyleReviews styleId={inputText} />)}
    </div>);
};

export default IndexPage;