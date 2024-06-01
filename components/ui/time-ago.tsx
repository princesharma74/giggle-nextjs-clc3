
import { formatDistanceToNow } from "date-fns";
import React from "react";

interface TimeAgoProps{
    data: Date
}
const TimeAgo : React.FC<TimeAgoProps> = ({
    data
}) => {
    return ( 
        <span>{formatDistanceToNow(data, { addSuffix: true })}</span>
     );
}
 
export default TimeAgo;