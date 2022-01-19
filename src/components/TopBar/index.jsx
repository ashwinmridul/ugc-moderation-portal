import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <img src='/img/myntra_logo.png' />
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        UGC Moderation Portal
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};