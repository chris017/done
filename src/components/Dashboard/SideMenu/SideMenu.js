import './SideMenu.css'
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from "./LogoutButton";

const SideMenu = () => {

    const { user } = useAuth0();
    const { isLoading, error } = useAuth0();

    return (
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse bgSideBar">
            <div class="position-sticky pt-3 sidebar-sticky">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <h1 class="logo" aria-current="page" href="#">
                            DONE
                        </h1>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active navEntrySideMenu" aria-current="page" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home align-text-bottom dashboardIcon" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                            Dashboard
                        </a>
                    </li>
                    {user?.picture && <img class="profilePic" src={user.picture} alt={user?.name} />}
                    <p>Welcome!  {user?.name}</p>
                    {!error && !isLoading && (
                        <>
                            <LogoutButton />
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default SideMenu;
