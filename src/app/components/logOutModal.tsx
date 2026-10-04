// "use client";
// import { motion, AnimatePresence } from "framer-motion";
// import { useApolloClient } from "@apollo/client/react";
// import { useRouter } from "next/navigation";
// import { useMutation } from "@apollo/client/react";
// import { clearAuthStorage } from "@/utils/logout";

// const LogoutModal = ({ open, onClose, onConfirm }: any) => {
//   const [logoutMutation] = useMutation(LOGOUT_MUTATION);
//   const client = useApolloClient();
//   const router = useRouter();
//   const handleLogout = async () => {
//   try {
//     await logoutMutation();

//     clearAuthStorage()
//     await client.clearStore();

//     router.replace("/login");
//   } catch (err) {
//     console.error(err);
//   }
// };
//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,23,42,0.6)] backdrop-blur"
//         >
//           <motion.div
//             initial={{ scale: 0.85, y: 40 }}
//             animate={{ scale: 1, y: 0 }}
//             exit={{ scale: 0.85, y: 40 }}
//             transition={{ duration: 0.25 }}
//             className="bg-white rounded-2xl p-6 w-[90%] max-w-md"
//           >
//             <h3 className="text-lg font-semibold text-[#391713] mb-3">
//               Confirm Logout
//             </h3>

//             <p className="text-sm text-gray-600 mb-5">
//               Are you sure you want to logout?
//             </p>

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={onClose}
//                 className="px-4 py-2 rounded-full bg-[#FFDECF] text-[#E95322]"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={onConfirm}
//                 className="px-4 py-2 rounded-full bg-[#E95322] text-white"
//               >
//                 Yes, Logout
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default LogoutModal;

"use client";

import { motion, AnimatePresence } from "framer-motion";

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const LogoutModal = ({
  open,
  onClose,
  onConfirm,
  loading,
}: LogoutModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,23,42,0.6)] backdrop-blur"
        >
          <motion.div
            initial={{ scale: 0.85, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: 40 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl p-6 w-[90%] max-w-md"
          >
            <h3 className="text-lg font-semibold text-[#391713] mb-3">
              Confirm Logout
            </h3>

            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 rounded-full bg-[#FFDECF] text-[#E95322]"
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                disabled={loading}
                className="px-4 py-2 rounded-full bg-[#E95322] text-white"
              >
                {loading ? "Logging out..." : "Yes, Logout"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoutModal;
