// src/components/Layout.jsx
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Header />
      <main style={{ marginTop: "80px", padding: "20px" }}>
        <Outlet /> {/* Child routes render here */}
      </main>
    </>
  );
}
