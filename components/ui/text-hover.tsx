import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface TooltipDemoProps {
    buttonLabel: string; 
    tooltipContent: string;
}
export const TooltipView : React.FC<TooltipDemoProps> = ({
    buttonLabel,
    tooltipContent,
}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div>{buttonLabel}</div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltipContent}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}