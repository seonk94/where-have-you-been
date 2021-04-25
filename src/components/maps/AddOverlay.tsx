import { useMutation } from '@apollo/client';
import { createStyles, Theme, AppBar, makeStyles, Toolbar, Tooltip, Typography, Button, Drawer, Input, Box, useRadioGroup } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';

import { CreateRecordResponse, CREATE_RECORD } from 'src/lib/graphql/record';
import React, { useContext, useEffect, useState } from 'react';
import MapContext from './MapProvider';
import useInputs from 'src/lib/hooks/useInputs';
import { useHistory } from 'react-router';
import { formatDate } from 'src/lib';
import { firebaseAuth } from 'src/lib/provider/AuthProvider';

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
  const history = useHistory();
  const classes = useStyles();
  const { naverMap } = useContext(MapContext);
  const [createRecord] = useMutation<CreateRecordResponse>(CREATE_RECORD);
  const [select, setSelect] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [marker, setMarker] = useState<null | naver.maps.Marker>(null);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [coordinate, setCoordinate] = useState([0, 0]);
  const { user } = useContext(firebaseAuth);
  const [form, onChange] = useInputs({
    title : '',
    content : ''
  });

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
      setDrawer(false);
      marker.setVisible(false);
      setSelect(false);
    }
  }

  function handleSave() {
    if (user) {
      createRecord({
        variables : {
          title : form.title,
          content : form.content,
          date : formatDate(selectedDate),
          coordinate : coordinate,
          userId : user.uid
        }
      });
    } else {
      alert('로그인이 필요합니다.');
      history.push('/login');
    }
    handleClose();
  }

  return select ? (<AppBar position="fixed" color="primary" className={classes.appBar}> 
    <Toolbar>
      <div className={classes.spacer}/>
      <Typography variant="subtitle2">
        새로 추가하시겠습니까?
      </Typography>
      <Box mx={1}>
        <Button size="small" variant="contained" color="secondary" onClick={() => setDrawer(true)}>
        YES
        </Button>
      </Box>
      <Drawer anchor="bottom" open={drawer}>
        <div className={classes.drawer}>
          <Box className={classes.inputBox}>
            <Input value={form.title} onChange={onChange} name="title" className={classes.input} placeholder="title"/>
          </Box>
          <Box className={classes.inputBox}>
            <Input value={form.content} onChange={onChange} name="content" className={classes.input} placeholder="description"/>
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
            <Box mx={1}>
              <Button size="small" variant="contained" color="secondary" onClick={handleSave}>
        저장
              </Button>
            </Box>
            <Box mx={1}>

              <Button size="small" variant="contained" color="default" onClick={handleClose} >
        닫기
              </Button>
            </Box>
          </div>
        </div>
      </Drawer>
      <Box mx={2}>
        <Button size="small" variant="contained" color="default" onClick={handleNo}>
        NO
        </Button>
      </Box>
    </Toolbar>
  </AppBar>) : <></>;
}

export default AddOverlay;

