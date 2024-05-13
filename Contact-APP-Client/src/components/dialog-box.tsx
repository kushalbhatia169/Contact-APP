import * as React from 'react'; // Importing React library
import Button from '@mui/material/Button'; // Importing Button component from Material-UI
import Dialog from '@mui/material/Dialog'; // Importing Dialog component from Material-UI
import DialogActions from '@mui/material/DialogActions'; // Importing DialogActions component from Material-UI
import DialogContent from '@mui/material/DialogContent'; // Importing DialogContent component from Material-UI
import DialogContentText from '@mui/material/DialogContentText'; // Importing DialogContentText component from Material-UI
import DialogTitle from '@mui/material/DialogTitle'; // Importing DialogTitle component from Material-UI
import { dialogBoxProps } from '../types/dialog.type'; // Importing type definition for dialog box props

// Functional component for an alert dialog box
export default function AlertDialog(props: dialogBoxProps) {

  return (
    <React.Fragment>
      <Dialog
        open={props.isOpen} // Prop for controlling the visibility of the dialog box
        onClose={() => props.setIsOpenBox(false)} // Callback function to handle closing the dialog box
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure?"} {/* Title of the dialog box */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.content} {/* Content of the dialog box */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* Button to cancel the action */}
          <Button onClick={() => {
            props.setIsOpenBox(false); // Closing the dialog box
          }}>No</Button>
          {/* Button to confirm the action */}
          <Button onClick={() => {
            props.onDelete(props.id); // Callback function to delete an item
            props.setIsOpenBox(false); // Closing the dialog box
          }}>
            Yes {/* Text for the confirm button */}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
