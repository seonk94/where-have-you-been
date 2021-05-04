import React, { useContext, useEffect, useState } from 'react';
import { MapContext } from 'src/lib/provider/MapProvider';
import AddOverlay from './AddOverlay';
import { makeStyles, Paper, Box } from '@material-ui/core';
import { useRecordState } from 'src/lib/provider/RecordProvider';

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
  const { map, setMap } = useContext(MapContext);
  const [markers, setMarkers] = useState([] as naver.maps.Marker[]);

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

  useEffect(() => {
    markers.forEach(marker => {
      marker.setMap(null);
    });
    if (map && list.length > 0) {
      list.forEach(data => {
        const marker = new naver.maps.Marker({
          map,
          position : new naver.maps.LatLng(data.coordinate[0], data.coordinate[1]),
          icon : {
            content : `
            <div class="marker-div">
              <span role="img">${data.emoji}</span>
            </div>
            `,
            size : new naver.maps.Size(22, 35),
            anchor : new naver.maps.Point(11, 35)
          }
        });
        addMarker(marker);
      });
    }
  }, [list]);

  const addMarker = (marker: naver.maps.Marker) => {
    setMarkers(state => {
      return [
        ...state,
        marker
      ];
    });
  };

  const filterMarker = () => {
    setMarkers(markers.filter(marker => marker.getMap()));
  };
  
  return (
    <Paper className={classes.root} elevation={0} square>
      <Box component="div" className={classes.ratio}>
        <Box component="div" id="map" className={classes.map}/>
        <AddOverlay/>
      </Box>
    </Paper>
  );
}

export default MapContainer;
