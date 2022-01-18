import { TextField } from '@mui/material';
import styled from 'styled-components';

const MainContainer = styled.div`
    padding: 15px;
`;

const SearchBar = styled(TextField)`
    min-width: 400px;
    margin-right: 40px;
`;

export {
    MainContainer,
    SearchBar
};