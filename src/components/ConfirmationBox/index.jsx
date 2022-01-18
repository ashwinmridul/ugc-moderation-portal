import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

export default ({ title, content, onAccept = () => {}, onReject = () => {} }) => {
    return (<Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={true}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>{content}</DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onReject}>Cancel</Button>
                <Button onClick={onAccept}>Ok</Button>
            </DialogActions>
        </Dialog>);
};