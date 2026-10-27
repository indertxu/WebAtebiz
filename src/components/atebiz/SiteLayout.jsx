import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SiteLayout() {
  const { lang } = useI18n();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
