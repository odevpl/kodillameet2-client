import { returnFetch } from "../helpers/returnFetch";
import { useQuery } from "./useQuery";

export const useInformation = (props) => {
  const id = props?.id || "";
  const { loading, payload, refetch } = useQuery({
    endpoint: `information`,
    isLazy: props?.isLazy,
  });

  const save = async ({ body }) => {
    const data = await returnFetch({ endpoint: "information", body });
    return data;
  };

  return {
    loading,
    payload,
    refetch,
    save,
  };
};
