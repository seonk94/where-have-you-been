import { createStyles, Theme, AppBar, makeStyles, Toolbar, Typography, Button, Box } from '@material-ui/core';

import React, { useContext, useEffect, useState } from 'react';
import MapContext from './MapProvider';

import AddRecordModal from './AddRecordModal';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar : {
      top : 'auto',
      bottom : 0
    },
    spacer : {
      flexGrow : 1
    }    
  })
);

function AddOverlay() {

  const classes = useStyles();
  const { naverMap } = useContext(MapContext);
 
  const [select, setSelect] = useState(false);
  const [open, setOpen] = useState(false);
  const [marker, setMarker] = useState<null | naver.maps.Marker>(null);

  const [coordinate, setCoordinate] = useState([0, 0]);

  useEffect(() => {
    if (naverMap) {
      const newMarker = new naver.maps.Marker({
        map : naverMap as naver.maps.Map
      });
      newMarker.setVisible(false);
      setMarker(newMarker);

      naver.maps.Event.addListener(naverMap, 'click', (e) => {
        newMarker.setPosition(e.coord);
        setCoordinate([e.coord.y, e.coord.x] as number[]);
        newMarker.setVisible(true);
        setSelect(true);
      });
    }
  }, []);


  function handleNo() {
    if (marker) {
      marker.setVisible(false);
      setSelect(false);
    }
  }

  function handleClose() {
    if (marker) {
      setOpen(false);
      marker.setVisible(false);
      setSelect(false);
    }
  }

  return select ? (<AppBar position="fixed" color="primary" className={classes.appBar}> 
    <Toolbar>
      <div className={classes.spacer}/>
      <Typography variant="subtitle2">
        새로 추가하시겠습니까?
      </Typography>
      <Box mx={1}>
        <Button size="small" variant="contained" color="secondary" onClick={() => setOpen(true)}>
        YES
        </Button>
      </Box>
      <Box mx={2}>
        <Button size="small" variant="contained" color="default" onClick={handleNo}>
        NO
        </Button>
      </Box>
      <AddRecordModal 
        open={open}
        coordinate={coordinate}
        handleClose={handleClose}
      />
    </Toolbar>
  </AppBar>) : <></>;
}

export default AddOverlay;

