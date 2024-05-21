import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
const Home = ({
    children
}: { children : React.ReactNode} ) => {
    return ( 
        <div>
            <Navbar/>
            {children}
            <Footer/>
        </div>
     );
}
 
export default Home;