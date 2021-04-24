import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, IconButton, List, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { useMainTemplateState } from 'src/lib/provider/RecordProvider';
import { MoreVert } from '@material-ui/icons';
import styled from 'styled-components';
import RecordCard from '../common/RecordCard';

interface Props {
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
  drawer: boolean;
}

const useStyles = makeStyles({
  drawer : {
    width : 250
  }
});

const RecordCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;

  > div {
    margin-bottom: 8px;
  }
`;

function RecordDrawer({ toggleDrawer, drawer } : Props) {
  const classes = useStyles();
  const { data } = useMainTemplateState();

  const list = () => (
    <div
      className={clsx(classes.drawer)}
      role="presentation"
    >
      <RecordCardContainer>
        {data.map(record => (
          <RecordCard record={record} key={record._id} />
        ))}
      </RecordCardContainer>

    </div>
  );

  return (
    <SwipeableDrawer anchor="left" open={drawer} onOpen={toggleDrawer(true)} onClose={toggleDrawer(false)}>
      {list()}
    </SwipeableDrawer>
  );
}

export default RecordDrawer;
