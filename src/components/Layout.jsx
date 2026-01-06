import { Link, Outlet } from "react-router-dom"

const Layout = () => {
    return(
        <div>
            <nav className="flex justify-end gap-10 p-3 font-medium">
                <Link className="hover:text-blue-400 active:text-blue-600" to="/">Dashboard</Link>
                <Link className="hover:text-blue-400 active:text-blue-600" to="/entries">Entries</Link>
            </nav>
            <main className="p-4">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;