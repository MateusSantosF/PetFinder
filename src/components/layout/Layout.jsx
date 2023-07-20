import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Container from "./Container";


const Layout = ()=>{
    return (
       <>
        <Navbar/>
        <Container>
            <Outlet/>
        </Container>
        <Footer/>
       </>
    )
}

export default Layout;