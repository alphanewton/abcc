import { app } from "@/firebase";
import { getPortalUrl } from "@/stripePayment";
import { useRouter } from "next/navigation";

function ManageAccountButton() {
  const router = useRouter();

  const manageSubscription = async () => {
    const portalURL = await getPortalUrl(app);
    router.push(portalURL);
    console.log("Managing Subscription");
  };

  return <div onClick={manageSubscription}>Manage</div>;
}

export default ManageAccountButton;
