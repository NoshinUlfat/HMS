import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fab, ListItem, ListItemButton, ListItemText } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import "./accordion.scss"

import moment from 'moment';
import PdfViewer from '../pdfViewer/PdfViewer';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions({showButton,items,setListItems}) {
  const [expanded, setExpanded] = React.useState('panel1');

  console.log("items ",items)

  const handleChange =
    (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleDelete = (key) => {
    setListItems(items.filter(item => item.key !== key))
  }

  return (
    <div>
      {items.map((item, index) => (
        <Accordion expanded={expanded === item.key} onChange={handleChange(item.key)} key={index}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{item.value.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Typography> */}
          <div class="list-boxInner"> 
            <ListItem sx={{ display: 'block', backgroundColor: 'transparent' }}>
                  <div className="items">
                    <div className="left">
                      <ListItemText secondary={<Typography type="body2" style={{ color: 'red', fontWeight: 'bold', fontSize: '10px' }}>{moment(item.value.date).format('DD-MM-YYYY')}</Typography>}></ListItemText>
                      {!showButton?
                      <ListItemText secondary={<Typography type="body2" style={{ color: 'blue', fontWeight: 'bold', fontSize: '12px' }}>Submitted By : {item.value.studentsId.studentId} ({item.value.studentsId.username})</Typography>}></ListItemText>
                      :<></>}
                      <ListItemText secondary={<Typography type="body2" style={{ fontWeight: 'bold', fontSize: '12px' }}>Amount : {item.value.amount} taka</Typography>}></ListItemText>
                      <ListItemText secondary={<Typography type="body2" style={{ fontWeight: 'bold', fontSize: '15px' }}>{item.value.title}</Typography>}></ListItemText>
                      <ListItemText secondary={<Typography type="body2" style={{ fontSize: '12px' }}>{item.value.description}</Typography>}></ListItemText>
                    </div>
                    <div className="right">
                      {showButton?
                      <Fab color="secondary" aria-label="edit" onClick={() => handleDelete(item.key)}>
                        <DeleteIcon/>
                      </Fab>:<></>}
                      {!showButton?
                      <div className="buttons">
                          <div className="buttonDetails">
                              <div className="editButton" >
                                  {/* <span> <PictureAsPdfIcon className='icon'/> Show pdf </span> */}
                                  <PdfViewer pdffile ={item.file} buttonName={"Show Pdf"} randId={item.key}
                                styeAll={{ position: "absolute",
                                top: "0",
                                right: "0",
                                padding: "5px",
                                fontSize: "12px",
                                fontWeight: "bold",
                                backgroundColor: "rgb(200,200,200)",
                                cursor: "pointer",
                                borderRadius: "0px 0px 0px 5px"
                            
                                }}/>
                              </div>
                          </div>
                      </div>
                      :<></>}
                    </div>
                  </div>
                {/* </ListItemButton> */}
            </ListItem>
        </div>
          {/* </Typography> */}
        </AccordionDetails>
      </Accordion>
      ))}
        
    </div>
  );
}
