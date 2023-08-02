import {Outlet} from "react-router-dom";
import Navbar from "./Navbar.tsx";

export default function Layout() {
    return(
      <div>
          <header>
              <Navbar/>
          </header>
          <main style={{ flex: '1 0 auto' }}>
              <Outlet />
          </main>
      </div>
    );
}