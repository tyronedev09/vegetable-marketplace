import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import React from 'react'

interface Props {
  open: boolean
  onSubmit: (e: React.SyntheticEvent) => void
  handleClose: () => void
}

export default function ConfirmOrderDialog({ open, handleClose, onSubmit }: Props) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="dialog-title">Confirm order ?</DialogTitle>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
