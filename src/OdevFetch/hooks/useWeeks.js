import { useQuery } from "./useQuery";

export const useWeeks = (props) => {
  const query = props?.query;
  const { loading, payload, refetch } = useQuery({
    endpoint: "weeks",
    query,
  });

  return {
    loading,
    payload,
    refetch,
  };
};
