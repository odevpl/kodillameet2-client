import { useQuery } from "./useQuery";

export const useUsers = (props) => {
  const query = props?.query;
  const { loading, payload, refetch } = useQuery({
    endpoint: `users`,
    query
  });

  // const save = async ({ body }) => {
  //   const data = await returnFetch({ endpoint: "user", body });
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