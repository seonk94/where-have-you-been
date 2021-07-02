import React, { useContext, useEffect, useState } from 'react';
import { MapContext } from 'src/lib/provider/MapProvider';
import AddOverlay from './AddOverlay';
import { makeStyles, Paper, Box } from '@material-ui/core';
import { useRecordState } from 'src/lib/provider/RecordProvider';
import Marker from './Marker';

const useStyles = makeStyles({
  root : {
    position : 'sticky',
    top : '-164px',
    zIndex : 500
  },
  ratio : {
    position : 'relative',
    width : '100%',
    paddingTop : '100%'
  },
  map : {
    width : '100%',
    height : '100%',
    position : 'absolute!important' as 'absolute',
    top : 0,
    left : 0
  }
});

function MapContainer() {
  const { list } = useRecordState();
  const classes = useStyles();
  const { setMap } = useContext(MapContext);

  useEffect(() => {
    const mapOptions = {
      center : new naver.maps.LatLng(37.3595704, 127.105399),
      zoom : 15
    };
    const map = new naver.maps.Map('map', mapOptions);
    if (setMap) {
      setMap(map);
    } 
  }, []);
  
  return (
    <Paper className={classes.root} elevation={0} square>
      <Box component="div" className={classes.ratio}>
        <Box component="div" id="map" className={classes.map}/>
        {list.map(record => <Marker key={record._id} record={record} />)}
        <AddOverlay/>
      </Box>
    </Paper>
  );
}

export default MapContainer;
