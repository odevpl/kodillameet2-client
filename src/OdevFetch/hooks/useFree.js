import { useQuery } from "./useQuery";

export const useFree = (props) => {
  const query = props?.query;
  const { loading, payload, refetch } = useQuery({
    endpoint: "terms/free",
    query,
  });

  return {
    loading,
    payload,
    refetch,
  };
};
