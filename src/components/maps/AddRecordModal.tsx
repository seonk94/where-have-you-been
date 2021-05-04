import { useMutation } from '@apollo/client';
import { Box, Button, Paper, createStyles, Input, makeStyles, Modal, Theme, ButtonGroup } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useContext, useState } from 'react';
import { CreateRecordResponse, CREATE_RECORD } from 'src/lib/graphql/record';
import useInputs from 'src/lib/hooks/useInputs';
import { firebaseAuth } from 'src/lib/provider/AuthProvider';
import { formatDate } from 'src/lib';
import { useHistory } from 'react-router';
import { useRecordDispatch } from 'src/lib/provider/RecordProvider';
import DateFnsUtils from '@date-io/date-fns';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top : `${top}%`,
    left : `${left}%`,
    transform : `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    spacer : {
      flexGrow : 1
    },
    modal : {
      position : 'absolute'
    },
    modalCard : {
      display : 'flex',
      flexDirection : 'column',
      padding : '16px',
      borderRadius : '8px',
      minWidth : '320px'
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

const emojiList = [
  { emoji : '💖', label : 'heart' },
  { emoji : '😊', label : 'smile' },
  { emoji : '😎', label : 'sunglasses' },
  { emoji : '👀', label : 'eye' },
  { emoji : '🌹', label : 'flower' },
  { emoji : '🎉', label : 'celebration' },
  { emoji : '😢', label : 'sad' }
];

interface Props {
  open: boolean;
  coordinate: number[];
  handleClose: () => void;
}

function AddRecordModal({ open, handleClose, coordinate }: Props) {
  const dispatch = useRecordDispatch();
  const history = useHistory();
  const [modalStyle] = useState(getModalStyle);
  const [selectedDate, handleDateChange] = useState(new Date());
  const { user } = useContext(firebaseAuth);
  const classes = useStyles();
  const [createRecord] = useMutation<CreateRecordResponse>(CREATE_RECORD);
  const [emoji, setEmoji] = useState('💖');
  const [form, onChange] = useInputs({
    title : '',
    content : ''
  });

  function handleSave() {
    if (user) {
      createRecord({
        variables : {
          title : form.title,
          content : form.content,
          date : formatDate(selectedDate),
          coordinate : coordinate,
          userId : user.uid,
          emoji : emoji
        }
      }).then(res => {
        if (res.data) {
          dispatch({
            type : 'PUSH_LIST',
            payload : res.data.createRecord
          });
        }
      });
    } else {
      handleNonAuth();
    }
    handleClose();
  }

  function handleNonAuth() {
    alert('로그인이 필요합니다.');
    history.push('/login');
  }
  const handleEmoji = (emoji: string) => {
    setEmoji(emoji);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

      <Modal open={open} onClose={handleClose}>
        <Paper style={modalStyle} className={classes.modal}>
          <Paper className={classes.modalCard}>
            
            <Box className={classes.inputBox}>
              <Input value={form.title} onChange={onChange} name="title" className={classes.input} placeholder="title"/>
            </Box>
            <Box className={classes.inputBox}>
              <Input multiline rows={4} value={form.content} onChange={onChange} name="content" className={classes.input} placeholder="description"/>
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
            <Box className={classes.inputBox}>
              <ButtonGroup disableElevation variant="contained" color="primary">
                {emojiList.map(e => <Button color={e.emoji === emoji ? 'secondary' : 'primary'} key={e.label} onClick={() => handleEmoji(e.emoji)}><span role="img" aria-label={e.label}>{e.emoji}</span></Button>)}
              </ButtonGroup>
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
          </Paper>
        </Paper>
      </Modal>
    </MuiPickersUtilsProvider>
  );
}

export default React.memo(AddRecordModal);
