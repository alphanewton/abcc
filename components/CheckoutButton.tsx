"use client";

import { app, auth } from "@/firebase";
import { getPremiumStatus } from "@/getPremiumStatus";
import { getCheckoutUrl } from "@/stripePayment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import ManageAccountButton from "./ManageAccountButton";

function CheckoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const checkPremium = async () => {
      // Wait for authentication state to be available
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      setIsPremium(newPremiumStatus);
    };
    checkPremium();
  }, [app, auth.currentUser?.uid]);

  const createCheckoutSession = async () => {
    setLoading(true);
    const priceId = "price_1OD5ZxSGfuMB0gmUhl5ykF7t";
    const checkoutURL = await getCheckoutUrl(app, priceId);
    router.push(checkoutURL);
    console.log("Upgraded to Premium!");
    setLoading(false);
  };

  if (isPremium)
    return (
      <div className="rounded-md mt-8 bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white dark:text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80 disabled:bg-indigo-600/50 disabled:text-white disabled:cursor-default">
        <ManageAccountButton />
      </div>
    );

  return (
    <div
      onClick={() => createCheckoutSession()}
      className="rounded-md mt-8 bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white dark:text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80 disabled:bg-indigo-600/50 disabled:text-white disabled:cursor-default"
    >
      {loading ? <LoadingSpinner /> : "Sign Up"}
    </div>
  );
}

export default CheckoutButton;
