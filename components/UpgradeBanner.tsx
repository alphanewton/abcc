"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { app, auth } from "@/firebase";
import { getPremiumStatus } from "@/getPremiumStatus";
import { useRouter } from "next/navigation";

function UpgradeBanner() {
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const checkPremium = async () => {
      // Wait for authentication state to be available
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // if (auth.currentUser) {
      //   console.log("Current User (Header):", auth.currentUser);
      //   const newPremiumStatus = await getPremiumStatus(app);
      //   console.log("New Premium Status (Header):", newPremiumStatus);
      //   setIsPremium(newPremiumStatus);
      // } else {
      //   console.log("User is not authenticated (Header)");
      // }
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      console.log("Upgrade banner-> ", newPremiumStatus);
      setIsPremium(newPremiumStatus);
    };
    checkPremium();
  }, [app, auth.currentUser?.uid]);

  if (isPremium) return null;

  return (
    <div>
      <Button
        onClick={() => router.push("/register")}
        className="w-full rounded-none bg-gradient-to-r from-[#7775D6] to-[#E935C1] text-center text-white px-5 py-2 hover:from-[#7775D6] hover:to-[#E935C1] hover:shadow-md hover:opacity-75 transition-all"
      >
        Upgrade to Pro to unlock all features!
      </Button>
    </div>
  );
}

export default UpgradeBanner;
