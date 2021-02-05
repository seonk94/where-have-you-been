// eslint-disable-next-line import/named
import { SemanticICONS } from 'semantic-ui-react';

export interface ListItem {
  id: number;
  coordinate: number[];
  title: string;
  content: string;
  iconType: SemanticICONS;
  date: string;
}