import { Inter } from "next/font/google";
import "./_style/globals.css";
import Provider from "./Provider";
import Header from "./_components/Hearder";
import { EmployeeProvider } from "./_context/EmplyeesContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Employee Management ",
  description: "An employee management system application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <EmployeeProvider>
          <Provider>
            <Header />
            <main className="container mx-auto px-[100px]">{children}</main>
          </Provider>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px, 24px",
                backgroundColor: "#fff",
                color: "#374151",
              },
            }}
          />
        </EmployeeProvider>
      </body>
    </html>
  );
}
