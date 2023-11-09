import { useAppDispatch } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/services/authAPIService";
import { logout as setLogout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const router = useRouter();

  logout(undefined)
    .unwrap()
    .then(() => {
      dispatch(setLogout());
      router.refresh();
    });
}
