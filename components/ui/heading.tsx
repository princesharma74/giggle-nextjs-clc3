interface HeadingProps{
    title: string; 
    description: string;
}
const Heading:React.FC<HeadingProps> = ({title, description}) => {
    return ( 
        <div>
            <h2 
            className="text-2xl font-bold tracking-tight text-center">{title}</h2>
            <p className="text-center">{description}</p>
        </div> 
    );
}
 
export default Heading;