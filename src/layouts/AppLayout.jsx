import { Navbar } from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export const AppLayout = ({children}) => {
    const {user} = useAuth()

    return (
        <>
            <Navbar user={user} />
            <main className="pt-16">
                {children}
            </main>
        </>
    );
}
