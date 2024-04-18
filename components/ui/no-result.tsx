const NoResults = ({
    message
} : {message: string}) => {
    return ( 
        <div className="flex items-center w-full h-full text-center">
            {message}
        </div>
     );
}
 
export default NoResults;