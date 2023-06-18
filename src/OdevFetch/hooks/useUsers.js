import { useQuery } from "./useQuery";

export const useUsers = (props) => {
  const query = props?.query;
  const { loading, payload, refetch } = useQuery({
    endpoint: `users`,
    query
  });

  return {
    loading,
    payload,
    refetch,
  };
};