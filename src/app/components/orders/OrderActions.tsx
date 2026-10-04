import { useMutation } from "@apollo/client/react";

import { UPDATE_ORDER_STATUS } from "@/graphql/mutations/order.mutations";

import toast from "react-hot-toast";

interface Props {
  orderId: string;

  status: string;

  refetch: () => void;
}

export default function OrderActions({ orderId, status, refetch }: Props) {
  const [updateStatus] = useMutation(UPDATE_ORDER_STATUS);

  const handleUpdate = async (nextStatus: string) => {
    try {
      await updateStatus({
        variables: {
          orderId,
          status: nextStatus,
        },
      });

      toast.success("Order updated successfully");

      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (status === "pending") {
    return (
      <button
        onClick={() => handleUpdate("accepted")}
        className="px-3 py-1 rounded bg-green-600 text-white text-xs"
      >
        Accept
      </button>
    );
  }

  if (status === "accepted") {
    return (
      <button
        onClick={() => handleUpdate("preparing")}
        className="px-3 py-1 rounded bg-blue-600 text-white text-xs"
      >
        Start Preparing
      </button>
    );
  }

  if (status === "preparing") {
    return (
      <button
        onClick={() => handleUpdate("ready_for_pickup")}
        className="px-3 py-1 rounded bg-purple-600 text-white text-xs"
      >
        Ready
      </button>
    );
  }

  return null;
}
