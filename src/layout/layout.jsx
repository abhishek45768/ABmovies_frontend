import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';
import RouterComponent from '../Routers/router';

const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <RouterComponent />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
