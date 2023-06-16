import { useQuery } from "./useQuery";

export const useReserved = (props) => {
  const query = props?.query;
  const { loading, payload, refetch } = useQuery({
    endpoint: "terms/reserved",
    query,
  });

  return {
    loading,
    payload,
    refetch,
  };
};
