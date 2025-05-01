import { NavbarAdmin } from '../components/NavbarAdmin';
import { useAuth } from '../context/AuthContext';
import CenterContainer from './CenterContainer';

export const AppLayoutAdmin = ({children}) => {
    const {user} = useAuth()

    return (
        <>
            <NavbarAdmin user={user} />
            <CenterContainer className="pt-16">
                {children}
            </CenterContainer>
        </>
    );
}
