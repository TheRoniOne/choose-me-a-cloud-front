import { useAppDispatch } from "@/app/redux/hooks";
import { useLogoutMutation } from "@/app/redux/services/authAPIService";
import { logout as setLogout } from "@/app/redux/slices/authSlice";
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
