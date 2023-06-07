import { useQuery } from "./useQuery";

export const useTerms = (props) => {
  const query = props?.query;
  const { loading, payload, refetch } = useQuery({
    endpoint: "terms",
    query,
  });

  return {
    loading,
    payload,
    refetch,
  };
};
