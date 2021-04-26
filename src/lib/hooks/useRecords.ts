import { FindRecordsByUserIdResponse, GET_RECORDS_BY_USERID } from './../graphql/record';
import { useQuery } from '@apollo/client';
export default function useRecords(userId: string) {

  const { data, loading } = useQuery<FindRecordsByUserIdResponse>(GET_RECORDS_BY_USERID, {
    variables : {
      userId : userId
    }
  });

  return {
    data,
    loading
  };
}