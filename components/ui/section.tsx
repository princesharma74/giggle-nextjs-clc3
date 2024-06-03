import React from "react";

interface ContainerProps{
    children: React.ReactNode
}

const Section : React.FC<ContainerProps> = ({
    children
}) => {
    return ( 
        <div className="mx-auto max-w-5xl my-4">
            {children}
        </div>
     );
}
 
export default Section;