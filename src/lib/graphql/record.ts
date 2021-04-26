import gql from 'graphql-tag';
// eslint-disable-next-line import/named

export type Record = {
    _id: string;
    coordinate: number[];
    title: string;
    content: string;
    date: string;
    userId: string;
};

export const GET_RECORDS = gql`
  query AllRecords {
    allRecords {
      data {
        _id
        title
        content
        date
        userId
        coordinate
      }
    }
  }
`;


export type GetRecordsResponse = {
  allRecords: {
    data: Record[]
  };
};

export const GET_RECORDS_BY_USERID = gql`
  query FindRecordsByUserId($userId: String) {
    findRecordsByUserId(userId: $userId) {
      data {
        _id
        title
        content
        date
        userId
        coordinate
      }
    }
  }
`;

export const CREATE_RECORD = gql`
  mutation CreateRecord(
    $title: String!,
    $content: String!,
    $date: String!,
    $userId: String!,
    $coordinate: [Float]!
  ) {
    createRecord(
      data: {
        title: $title,
        content: $content,
        date: $date,
        userId: $userId,
        coordinate: $coordinate
      }
    ) {
      _id
      title
      content
      date
      coordinate
      userId
    }
  }
`;

export type CreateRecordResponse = {
  createRecord: {
    _id: number;
    title: string;
    content: string;
    date: string;
    coordinate: number[];
    userId: number;
  };
};

export type FindRecordsByUserIdResponse = {
  findRecordsByUserId: {
    data: Record[]
  }
}

export const DELETE_RECORD = gql`
  mutation DeleteRecord($id: String!) {
    deleteRecord(id: $id) {
      _id
    }
  }
`;