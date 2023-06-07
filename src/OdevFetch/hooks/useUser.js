import { returnFetch } from "../helpers/returnFetch";
import { useQuery } from "./useQuery";

export const useUser = (props) => {
  const uuid = props?.uuid || "";
  const { loading, payload, refetch } = useQuery({
    endpoint: `user/${uuid}`,
    isLazy: props?.isLazy,
  });

  // const save = async ({ body }) => {
  //   const data = await returnFetch({ endpoint: "term", body });
  //   return data;
  // };

  // const remove = async ({ id }) => {
  //   const data = await returnFetch({ endpoint: `term/${id}/remove` });
  //   return data;
  // };

  return {
    loading,
    payload,
    refetch,
    // save,
    // remove,
  };
};
