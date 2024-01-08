import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';


function InfoButton({ title, info }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
    };

    return (
        <Box sx={{ width: 500 }}>
        <Popper
          sx={{ zIndex: 1200 }}
          open={open}
          anchorEl={anchorEl}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <Typography sx={{ p: 2 }}>{info}</Typography>
              </Paper>
            </Fade>
          )}
        </Popper>

        <IconButton onClick={(event)=>handleClick(event)}>{title}</IconButton>
      </Box>
    )
}

export default InfoButton
