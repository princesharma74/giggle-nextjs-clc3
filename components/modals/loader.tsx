import { useLoaderModal } from "@/hooks/use-loader-modal";
import { Spinner } from "../ui/spinner";

const Loader = () => {
    const loaderModal = useLoaderModal()
    return ( 
           loaderModal.isOpen &&
           <div className="bg-gray-400 w-screen h-screen">
                <Spinner/>
           </div>
     );
}
 
export default Loader;