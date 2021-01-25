import React, { useState } from 'react';
import Map from 'src/components/map/Map';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'src/components/layers/TileLayer';
import Layers from 'src/components/layers/Layers';
import Controls from 'src/components/controls/Controls';
import FullScreenControl from 'src/components/controls/FullScreenControl';
import { osm } from 'src/utils';
import MarkerOverlay from 'src/components/overlay/MarkerOverlay';
import { ListItem } from 'src/types';
import NewMarkerOverlay from 'src/components/overlay/NewMarkerOverlay';
import MapAlert from 'src/components/map/MapAlert';


const dummyCoordinate : ListItem[] = [
  {
    coordinate : [14138144.412188971, 4508760.443846234],
    content : '강남에서...',
    title : '강남',
    iconType : 'BuildingTwo',
    date : '2021-01-01'
  },
  {
    coordinate : [14134951.264779307, 4520037.752975805],
    content : '경복궁에서...',
    title : '경복궁',
    iconType : 'Palace',
    date : '2021-01-01'
  },
  {
    coordinate : [14074875.764536034, 4503258.59338613],
    content : '인천공항에서... 어쩌구 저쩌구 ',
    title : '인천공항',
    iconType : 'Aviation',
    date : '2021-01-01'
  }
];


function MainMap() {
  const [center, setCenter] = useState([126.949860, 37.586954]);
  const [zoom, setZoom] = useState(9);

  return (
    <Map center={fromLonLat(center)} zoom={zoom}>
      <Layers>
        <TileLayer
          source={osm()}
          zIndex={0}
        />
      </Layers>
      <Controls>
        <FullScreenControl />
      </Controls>
      <MapAlert show={false}/>
      <NewMarkerOverlay  show={false}/>
      {
        dummyCoordinate.map((data, index) => (
          <MarkerOverlay key={index} item={data}/>
        ))
      }
    </Map>
  );
}

export default MainMap;
