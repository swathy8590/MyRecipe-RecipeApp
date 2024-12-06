

"use client";
import localFont from "next/font/local";
import "../globals.css";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { createContext, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Loginpage from "../usercomponents/loginpage/Loginpage";
import Mainpage from "../usercomponents/mainpage/Mainpage";
import { Provider } from "../provider/provider";




const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };
export const PageContext = createContext(null);
export default function RootLayout({ children }) {
  // const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [signup, setsignup] = useState(false)

  return (
    <html lang="en">
      <PageContext.Provider value={{ login: login, setLogin: setLogin, signup: signup, setsignup: setsignup }}>
        <Provider>
          <body
          >
            <div className="h-auto bg-white  roboto-medium">
              <Mainpage login={login} setLogin={setLogin} signup={signup} setsignup={setsignup} />
              <div >

                {children}

              </div>
            </div>
          </body >
        </Provider>
      </PageContext.Provider>

    </html >

  );
}
