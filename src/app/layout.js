'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import '../style/table.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation'
import Loader from "@/helper/loader/loader";
import { Providers } from "./Redux/StoreProvider";
import PrelineScript from "@/components/prelineScript";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // let auth = window.localStorage.getItem("authToken");
  // useEffect(() => {
  //   if (!auth) {
  //     router.push('/login')
  //   } else {
  //     if (auth && pathname === '/login') {
  //       router.push('/dashboard')
  //     }
  //   }
  // }, [pathname]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <PrelineScript />
        <Providers>
          <ToastContainer />
          <Loader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
