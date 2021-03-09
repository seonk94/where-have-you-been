import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, IconButton, List, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { useMainTemplateState } from 'src/lib/provider/RecordProvider';
import { MoreVert } from '@material-ui/icons';
import styled from 'styled-components';

interface Props {
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
  drawer: boolean;
}

const useStyles = makeStyles({
  drawer : {
    width : 250
  },
  list : {
    padding : '0'
  },
  root : {
    flexGrow : 1
  },
  spacer : {
    flexGrow : 1
  }
});

const ListItem = styled.div`
  display: block;
  padding: 4px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const DateRow =styled.div`
display: flex;
align-items: center;
width: 100%;
`;

function RecordDrawer({ toggleDrawer, drawer } : Props) {
  const classes = useStyles();
  const { data } = useMainTemplateState();

  const list = () => (
    <div
      className={clsx(classes.drawer)}
      role="presentation"
    >
      <List className={classes.list}>
        {
          data.map((record, index) => <>
            <ListItem key={record._id}>
              <TitleRow>
                <Typography variant="h6">
                  {record.title}
                </Typography>
                <div className={classes.spacer}/>
                <IconButton size="small" edge="start" color="inherit" aria-label="menu">
                  <MoreVert />
                </IconButton>
              </TitleRow>
              <DateRow>
                <Typography variant="caption">
                  {record.date}
                </Typography>
              </DateRow>
              <Grid item>
                <Typography variant="subtitle2">
                  {record.content}
                </Typography>
              </Grid>
            </ListItem>
            {index !== data.length -1 && <Divider/>}
          </>)
        }
      </List>
    </div>
  );

  return (
    <SwipeableDrawer anchor="left" open={drawer} onOpen={toggleDrawer(true)} onClose={toggleDrawer(false)}>
      {list()}
    </SwipeableDrawer>
  );
}

export default RecordDrawer;
