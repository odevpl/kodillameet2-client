import { useQuery } from "./useQuery";
import { returnFetch } from "../helpers/returnFetch";

export const useWeeks = (props) => {
  const query = props?.query;
  const { loading, payload, refetch } = useQuery({
    endpoint: "weeks",
    query,
  });

  const save = async () => {
    const data = await returnFetch({ endpoint: "week" });
    return data;
  };

  return {
    loading,
    payload,
    refetch,
    save
  };
};
