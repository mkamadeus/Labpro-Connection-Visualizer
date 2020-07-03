import React, { useState } from 'react';
import {
  MenuItem,
  Dialog,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  IconButton,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // padding: 0,
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      colors: theme.palette.grey[500],
    },
  })
);

type DialogBaseProps = {
  action: string;
  title: string;
  button?: React.ReactNode;
  children?: React.ReactNode;
};

/**
 * `DialogBase` component.
 * The component that defines the base of all dialogs.
 * @param props The props supplied to the component, having type DialogBaseProps
 */
const DialogBase = (props: DialogBaseProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <MenuItem onClick={handleOpen}>{props.action}</MenuItem>
      <Dialog open={open}>
        <MuiDialogTitle>
          <Typography variant="h6">{props.title}</Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent dividers classes={{ root: classes.root }}>
          {props.children}
        </DialogContent>
        {props.button ? <DialogActions>{props.button}</DialogActions> : null}
      </Dialog>
    </>
  );
};

export default DialogBase;
