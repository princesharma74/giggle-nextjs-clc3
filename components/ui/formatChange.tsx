interface formatRatingChangeProps{
    change: number
}
const FormatRatingChange : React.FC<formatRatingChangeProps> = ({
    change
}) => {
    return ( 
        change < 0 ?
        <span className="text-red-500">
            -{change}
        </span> :
        <span className="text-green-500">
            +{change}
        </span>
     );
}