import { Navbar } from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import CenterContainer from './CenterContainer';

export const AppLayout = ({children}) => {
    const {user} = useAuth()

    return (
        <>
            <Navbar user={user} />
            <CenterContainer className="pt-16">
                {children}
            </CenterContainer>
        </>
    );
}
