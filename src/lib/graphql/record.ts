import gql from 'graphql-tag';
// eslint-disable-next-line import/named
import { SemanticICONS } from 'semantic-ui-react';

export type Record = {
    id: number;
    coordinate: number[];
    title: string;
    content: string;
    iconType: SemanticICONS;
    date: string;
    userId: number;
};

export const GET_RECORDS = gql`
    query AllRecords {
        allRecords {
        data {
            title
            content
            iconType
            date
            userId
            coordinate
            }
        }
    }
`;

export const GET_RECORDS_BY_USERID = gql`
  query RecordsByUserId($userId: ID) {
    recordsByUserId(userId: $userId) {
      data {
        title
        content
        iconType
        date
        userId
        coordinate
      }
    }
  }
`;

// export type GetTagsResponse = {
//   tags: Tag[];
// };

// export type GetUserTagsResponse = {
//   userTags: {
//     tags: Tag[];
//     posts_count: number;
//   };
// };

// export type GetTagResponse = {
//   tag: Tag;
// };
