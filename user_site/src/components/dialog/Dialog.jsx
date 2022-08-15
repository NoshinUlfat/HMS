import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ToDoList from './../todo/ToDoList'
import "./dialog.scss"
import axios from 'axios';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [items,setListItems] = React.useState([]);
  const [info,setInfo] = React.useState({});

  const handleChangeText = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave =async () => {
    let totalcost = 0
    items.map(item => {
      totalcost += parseFloat(item.value.mealItemPrice)
    })

    const {...rest} = info;

    const newRequest = {
      "meal": {
        ...rest,
        "mealPrice" : totalcost,
        "mealStarus" : true
      },
      "mealItems": items.map(item => item.value),
    }

    console.log("newRequest:",newRequest)

    try {
      const response = await axios.post('/dining/setMeal',newRequest)
      console.log(response)
    } catch (error) {
      console.log("error in seeting meal",error)
    }
    setInfo({})
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Meal Menu
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Meal Menu</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* <form action="#" method="post"> */}
              <div className="form-dialog">
                  <input type="date" className='input' id='date' value={info.date} onChange={handleChangeText}/>
                  <input type="text" placeholder='Meal Hour'className='input' id='mealHour' value={info.mealHour} onChange={handleChangeText}/>
                  <ToDoList setListItems={setListItems}/>
              </div>
            {/* </form> */}
          </DialogContentText>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
