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

  const reserve = async ({ id, user_uuid }) => {
    const data = await returnFetch({
      endpoint: `term/reserve`,
      body: {
        event_id: id,
        user_uuid,
      },
    });
    return data;
  };

  const leave = async ({ id, user_uuid }) => {
    const data = await returnFetch({
      endpoint: `term/leave`,
      body: {
        event_id: id,
        user_uuid,
      },
    });
    return data;
  };

  const checkReservation = async ({ user_uuid }) => {
    const data = await returnFetch({
      endpoint: `term/check_reservation`,
      body: {
        user_uuid,
      },
    });
    return data;
  };

  return {
    loading,
    payload,
    refetch,
    save,
    remove,
    reserve,
    leave,
    checkReservation,
  };
};
