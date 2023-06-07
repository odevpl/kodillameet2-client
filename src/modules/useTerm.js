import { returnFetch } from "../helpers/returnFetch";
import { useQuery } from "./useQuery";

export const useTerm = (props) => {
  const id = props?.id || "";
  const { loading, payload, refetch } = useQuery({
    endpoint: `term/${id}`,
    isLazy: props?.isLazy,
  });

  const save = async ({ body }) => {
    const data = await returnFetch({ endpoint: "term", body });
    return data;
  };

  const remove = async ({ id }) => {
    const data = await returnFetch({ endpoint: `term/${id}/remove` });
    return data;
  };

  return {
    loading,
    payload,
    refetch,
    save,
    remove,
  };
};
