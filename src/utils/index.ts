import { Collection, Feature } from 'ol';
import Geometry from 'ol/geom/Geometry';
import { OSM, Vector } from 'ol/source';

export function osm() {
  return new OSM();
}

export function vector({ features } : { features : Feature<Geometry>[] | Collection<Feature<Geometry>> }) {
  return new Vector({
    features
  });
}
