import { createStyles, Theme, AppBar, makeStyles, Toolbar, Tooltip, Typography, Button, Drawer, Input, Box } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';

import React, { useContext, useEffect, useState } from 'react';
import MapContext from './MapProvider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar : {
      top : 'auto',
      bottom : 0
    },
    spacer : {
      flexGrow : 1
    },
    drawer : {
      width : '100%',
      height : '300px',
      display : 'flex',
      flexDirection : 'column'
    },
    inputBox : {
      margin : '8px 16px'
    },
    input : {
      width : '100%'
    },
    bottom : {
      margin : '8px',
      display : 'flex'
    }
  })
);

function AddOverlay() {
  const classes = useStyles();
  const { naverMap } = useContext(MapContext);
  const [select, setSelect] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [marker, setMarker] = useState<null | naver.maps.Marker>(null);
  const [selectedDate, handleDateChange] = useState(new Date());

  useEffect(() => {
    if (naverMap) {
      const newMarker = new naver.maps.Marker({
        map : naverMap as naver.maps.Map
      });
      setMarker(newMarker);

      naver.maps.Event.addListener(naverMap, 'click', (e) => {
        newMarker.setPosition(e.coord);
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
      setDrawer(false);
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
      <Button size="small" color="secondary" onClick={() => setDrawer(true)}>
        YES
      </Button>
      <Drawer anchor="bottom" open={drawer}>
        <div className={classes.drawer}>
          <Box className={classes.inputBox}>
            <Input className={classes.input} placeholder="title"/>
          </Box>
          <Box className={classes.inputBox}>
            <Input className={classes.input} placeholder="description"/>
          </Box>
          <Box className={classes.inputBox}>
            <DatePicker
              autoOk
              className={classes.input}
              clearable
              disableFuture
              value={selectedDate}
              onChange={(date) => handleDateChange(date as Date)}
            />
          </Box>
          <div className={classes.spacer} />
          <div className={classes.bottom}>
            <div className={classes.spacer} />
            <Button size="small" color="secondary" >
        저장
            </Button>
            <Button size="small" color="default" onClick={handleClose} >
        닫기
            </Button>
          </div>
        </div>
      </Drawer>
      <Button size="small" color="default" onClick={handleNo}>
        NO
      </Button>
    </Toolbar>
  </AppBar>) : <></>;
}

export default AddOverlay;

