"use client";

import { app, auth } from "@/firebase";
import { getPremiumStatus } from "@/getPremiumStatus";
import {
  useLanguageStore,
  LanguagesSupported,
  LanguagesSupportedMap,
} from "@/store/store";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

function LanguageSelect() {
  const [language, setLanguage, getLanguages, getNotSupportedLanguages] =
    useLanguageStore((state) => [
      state.language,
      state.setLanguage,
      state.getLanguages,
      state.getNotSupportedLanguages,
    ]);

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

  const isPro = isPremium;

  const pathName = usePathname();
  const isChatPage = pathName.includes("/chat");

  return (
    isChatPage && (
      <div className="mx-2">
        <Select
          onValueChange={(value: LanguagesSupported) => setLanguage(value)}
        >
          <SelectTrigger className="W-[150px] text-black dark:text-white">
            <SelectValue
              placeholder={LanguagesSupportedMap[language]}
              className=""
            />
          </SelectTrigger>
          <SelectContent>
            {getLanguages(isPro).map((language) => (
              <SelectItem key={language} value={language}>
                {LanguagesSupportedMap[language]}
              </SelectItem>
            ))}
            {getNotSupportedLanguages(isPro).map((language) => (
              <Link href={"/register"} key={language} prefetch={false}>
                <SelectItem
                  key={language}
                  value={language}
                  disabled
                  className="bg-gray-300/50 text-gray-500 dark:text-white py-2 my-1"
                >
                  {LanguagesSupportedMap[language]} (PRO)
                </SelectItem>
              </Link>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  );
}

export default LanguageSelect;
