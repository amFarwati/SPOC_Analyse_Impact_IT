import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';


function InfoButton({ title, info, onChange }) {

    const infos = info.split('\n');

    return (
        <Box >
            <Tooltip 
                title={
                    <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center">
                        {infos.map(e=>{return <Typography variant="h5" fontWeight="600" key={e} >{e}</Typography>})}
                    </Box>
                }  
                leaveDelay={200} 
                >
                <IconButton onChange={onChange}>{title}</IconButton>
            </Tooltip>
        </Box>
    )
}

export default InfoButton
