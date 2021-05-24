import { Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import RecordCardNonBoard from 'src/components/common/RecordCardNonBoard';
import MapContainer from 'src/components/maps/MapContainer';
import Appbar from 'src/components/navbar/Appbar';
import { useRecordState } from 'src/lib/provider/RecordProvider';

const useStyles = makeStyles({
  root : {
    minHeight : '100vh',
    height : '100%',
    display : 'grid',
    gridTemplateRows : '56px auto 1fr'
  },
  row : {
    flexGrow : 1
  },
  item : {
    maxWidth : '520px!important' as '520px'
  }
});

function MainTemplate() {
  const { list } = useRecordState();
  const classes = useStyles();

  return (
    <Paper className={classes.root} square>
      <Appbar/>

      <Grid className={classes.row} container justify="center"
        alignItems="stretch" direction="row">
        <Grid className={classes.item} item xs={12} sm={6}>
          {/* <BoardMenu/> */}
          <MapContainer/>
          {list.map((record, index) => <RecordCardNonBoard isFirst={index === 0} record={record} key={record._id} />)}
        </Grid>

      </Grid>
    </Paper>
  );
}

export default MainTemplate;
