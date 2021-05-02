import { useMutation } from '@apollo/client';
import { Button, Divider, IconButton, Menu, MenuItem, Typography, Paper } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';
import { Spacer } from 'src/assets/styles/GlobalStyles';
import { DeleteRecordResponse, DELETE_RECORD, Record } from 'src/lib/graphql/record';
import { useRecordDispatch } from 'src/lib/provider/RecordProvider';
import styled from 'styled-components';
import MoreVertIcon from '@material-ui/icons/MoreVert';

interface Props {
  record: Record;
  isFirst?: boolean;
}


const Container = styled(Paper)<{ isFirst : boolean }>`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-bottom: 1px solid #e6e6e6;
  border-top: 1px solid ${props => props.isFirst ? '#e6e6e6' : '#fff'};
`;
const TitleRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: no-wrap;
`;
const Date = styled.div`
  font-size: 10px;
  font-weight: 400;
  margin-bottom: 4px;
`;
const Content = styled.div`
  font-size: 12px;
  font-weight: 400;
  white-space: pre-line;
`;


function RecordCardNonBoard({ record, isFirst = false } : Props) {
  const dispatch = useRecordDispatch();
  const [deleteRecord] = useMutation<DeleteRecordResponse>(DELETE_RECORD);

  const [menu, setMenu] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenu(event.currentTarget);
  };

  const handleClose = () => {
    setMenu(null);
  };


  const handleDelete = () => {
    deleteRecord({
      variables : {
        id : record._id
      }
    }).then(res => {
      if (res.data) {
        dispatch({
          type : 'DELETE_LIST',
          payload : res.data.deleteRecord._id
        });
      }
    });
  };
  return (
    <Container isFirst={isFirst} elevation={0}>
      <TitleRow>
        <Typography variant="subtitle1">
          {record.title}
        </Typography>
        <Spacer/>
        <IconButton size="small" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}> 
          <MoreVertIcon/>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={menu}
          keepMounted
          open={Boolean(menu)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </TitleRow>
      <Date>
        <Typography variant="caption">
          {record.date}
        </Typography>
      </Date>
      <Content>
        <Typography variant="body1" component="p">
          {record.content}
        </Typography>
      </Content>
    </Container>
  );
}

export default React.memo(RecordCardNonBoard);
