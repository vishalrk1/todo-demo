import toast from "react-hot-toast";

export function SucessToast(message: string, isCenter: boolean = false) {
  return toast.success(message, {
    position: isCenter ? "top-center" : "top-right",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
}
