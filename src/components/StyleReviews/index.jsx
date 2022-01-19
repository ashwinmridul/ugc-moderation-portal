import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import TextField from '@mui/material/TextField';
import Delete from '@mui/icons-material/Delete';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Separator, UploadedImage } from './styles';
import ConfirmationBox from '../ConfirmationBox';
import CircularProgress from '@mui/material/CircularProgress';
import Icon from '@mui/material/Icon';
import Star from '@mui/icons-material/Star';
import { RATING } from '../../constants/colors';
import StarBorder from '@mui/icons-material/StarBorder';

const PAGE_SIZE = 10;

const Row = ({ row, fetchReviews }) => {
    const [open, setOpen] = useState(false);
    const [overallComments, setOverallComments] = useState('');
    const [confirmationProps, setConfirmationProps] = useState(undefined);

    const submitReview = (status) => {
        const images = row.images.map(image => {
            return {
                imageId: image.damId,
                status: image.checked ? 'APPROVED' : 'REJECTED',
                comment: image.comment || ''
            };
        });
        const body = {
            entityId: row.id,
            entityType: 'PRODUCT_REVIEW',
            domain: 'MYNTRA',
            status,
            comment: overallComments,
            images
        };
        fetch('/submitReview', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)}).then(() => fetchReviews());
    };

    const onApprove = () => {
        setConfirmationProps({
            title: 'Approve Review',
            content: 'Are you sure you want to approve this review?',
            onAccept: () => {
                submitReview('APPROVED');
                setConfirmationProps(undefined);
            },
            onReject: () => {
                setConfirmationProps(undefined);
            }
        });
    };

    const onReject = () => {
        setConfirmationProps({
            title: 'Reject Review',
            content: 'Are you sure you want to reject this review?',
            onAccept: () => {
                submitReview('REJECTED');
                setConfirmationProps(undefined);
            },
            onReject: () => {
                setConfirmationProps(undefined);
            }
        });
    };

    const onDelete = () => {
        setConfirmationProps({
            title: 'Delete Review',
            content: 'Are you sure you want to delete this review?',
            onAccept: () => {
                fetch(`/review/${row.id}`, { method: 'DELETE' })
                    .then(response => console.log(response));
                setConfirmationProps(undefined);
                fetchReviews();
            },
            onReject: () => {
                setConfirmationProps(undefined);
            }
        });
    };

    return (
      <React.Fragment>
        <TableRow>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{(new Date(Number(row.updatedAt))).toLocaleDateString()}</TableCell>
          <TableCell>{row.userName}</TableCell>
          <TableCell sx={{width: 100}}>
              {(new Array(row.userRating)).fill().map((f, i) => <Icon key={i} fontSize='small' sx={{color: RATING[row.userRating]}}><Star /></Icon>)}
              {(new Array(5 - row.userRating)).fill().map((f, i) => <Icon key={i} fontSize='small' sx={{color: RATING[row.userRating]}}><StarBorder /></Icon>)}
          </TableCell>
          <TableCell>{row.review}</TableCell>
          <TableCell>{row.status}</TableCell>
          <TableCell><IconButton onClick={onDelete} aria-label="Delete review"><Delete /></IconButton></TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <div>Uploaded images:</div>
                <ImageList cols={10}>
                    {row.images.map(image => <ImageListItem key={image.damId}>
                        <UploadedImage
                            src={`${image.url}?w=248&fit=crop&auto=format`} 
                            srcSet={`${image.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            loading="lazy"
                        />
                        <FormControl>
                            <Checkbox sx={{width: 248}} onChange={(event) => image.checked = event.target.checked} />
                            <TextField label="Comments" multiline sx={{width: 248}} onChange={(event) => image.comment = event.target.value} />
                        </FormControl>
                    </ImageListItem>)}
                </ImageList>
                <TextField fullWidth multiline label="Overall comments" value={overallComments} onChange={event => setOverallComments(event.target.value)} />
                <Separator />
                <Button variant="contained" color="success" onClick={onApprove} disabled={!overallComments}>Approve</Button>&nbsp;&nbsp;
                <Button variant="contained" color="error" onClick={onReject} disabled={!overallComments}>Reject</Button>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        {confirmationProps && <ConfirmationBox {...confirmationProps} />}
      </React.Fragment>
    );
  };

  const TablePaginationActions = ({ count, page, rowsPerPage, onPageChange }) => {
    const theme = useTheme();
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  };

export default ({styleId}) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchReviews = () => {
        setLoading(true);
        fetch(`/getReviewsByProduct/${styleId}?page=${page + 1}&size=${PAGE_SIZE}`).then(response => response.json()).then(response => {
            setLoading(false);
            setData(response.reviews);
            if (!totalReviews) {
                setTotalReviews(response.reviewsMetaData.reviewCount);
            }
        });
    };

    const onPageChange = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
      fetchReviews();
    }, [page])

    useEffect(() => {
        setPage(0);
        setTotalReviews(0);
        fetchReviews();
    }, [styleId]);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>;
    }

    return <TableContainer component={Paper}>
        <Table stickyHeader aria-label="reviews by product table">
            <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell><b>Time</b></TableCell>
                    <TableCell><b>User Name</b></TableCell>
                    <TableCell><b>Rating</b></TableCell>
                    <TableCell><b>Review</b></TableCell>
                    <TableCell><b>Status</b></TableCell>
                    <TableCell><b>Actions</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map(row => <Row key={row.id} row={row} fetchReviews={fetchReviews} />)}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[PAGE_SIZE]}
                        colSpan={7}
                        count={Number(totalReviews)}
                        rowsPerPage={PAGE_SIZE}
                        page={page}
                        onPageChange={onPageChange}
                        ActionsComponent={TablePaginationActions}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    </TableContainer>;
}