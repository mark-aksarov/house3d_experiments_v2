import "./global.scss";

import { Inter } from 'next/font/google';
import styles from './layout.module.scss';
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastsProvider } from "@/context/ToastsContext";
import { UndoProvider } from "@/context/UndoContext";

const montserrat = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'House 3d',
  description: 'House 3d configurator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={montserrat.className} style={{ touchAction: "none" }} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            const storedTheme = localStorage.getItem("theme");
            let initialTheme;
            if (
              storedTheme === "light" ||
              storedTheme === "dark"
            ) {
              initialTheme = storedTheme;
            }

            if(initialTheme) {
              document.firstElementChild.setAttribute('data-theme', initialTheme);
            }
          `}}>
        </script>
      </head>
      <body>
        <ThemeProvider>
          <UndoProvider>
            <ToastsProvider containerClassName={styles.toastContainer}>
              {children}
            </ToastsProvider>
          </UndoProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}