import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VerifyModal } from "./verification-modal";
import { useEffect, useState } from "react";
import { Platform } from "@prisma/client";
import { Copy, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import axios from "axios";

interface VerifyUserIdProps {
    platform: Platform;
    isOpen: boolean;
    loading: boolean;
    uuid: string;
    onLoading: () => void;
    onStopLoading: () => void;
    onClose: () => void;
}


const VerifyUserId : React.FC<VerifyUserIdProps> = ({
    platform,
    isOpen, 
    loading,
    uuid,
    onStopLoading,
    onLoading,
    onClose,
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const [copying, setCopying] = useState(false);
    const user = useSession().data?.user;
    const { toast } = useToast();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onVerify = async () => {
        onLoading();
        if(platform === Platform.codeforces) {
            try{
                // const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://codeforces.com/profile/${user?.codeforces_id}`)
                const data = { uuid, email: user?.email }
                const response = await axios.post(`/api/platform/codeforces/${user?.codeforces_id}`, data)
                toast({
                    title: response.data.title,
                    description: response.data.description,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
            catch(err : any) {
                toast({
                    title: "Verification Failed",
                    description: err.response.data.description,
                });
            }
        }
        else if(platform === Platform.codechef) {
            try{
                // const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://www.codechef.com/users/${user?.codechef_id}`)
                const data = { uuid, email: user?.email }
                const response = await axios.post(`/api/platform/codechef/${user?.codechef_id}`, data)
                toast({
                    title: response.data.title,
                    description: response.data.description,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
            catch(err : any) {
                toast({
                    title: "Verification Failed",
                    description: err.response.data.description,
                });
            }
        }
        else if(platform === Platform.leetcode) {
            try{
                const data = { uuid, email: user?.email }
                const response = await axios.post(`/api/platform/leetcode/${user?.leetcode_id}`, data)
                toast({
                    title: response.data.title,
                    description: response.data.description,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
            catch(err : any) {
                toast({
                    title: "Verification Failed",
                    description: err.response.data.description,
                });
            }
        }
        onClose()
        onStopLoading()
    }

    return ( 
        <VerifyModal
            title="Verify User ID"
            platform={platform}
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="flex flex-col gap-y-2">
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link">
                            Verification Code
                        </Label>
                        <Input
                            id="link"
                            defaultValue={uuid}
                            readOnly
                        />
                    </div>
                    <Button type="submit" size="sm" className="px-3"
                        onClick={() => {
                            setCopying(true);
                            navigator.clipboard.writeText(uuid);
                            toast({
                                title: "Copied",
                                description: "Verification code copied to clipboard",
                            })
                            setCopying(false);
                        }}
                    >
                        <span className="sr-only">Copy</span>
                        {copying ? <Loader2 className="h-4 w-4 animate-spin"/> : <Copy className="h-4 w-4"/>}
                    </Button>
                </div>
                <div>
                    <Button
                        className="w-full"
                        onClick={onVerify}
                        disabled={loading}
                    >
                        {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                        {loading ? "Verifying..." : "Verify"}
                    </Button>
                </div>
            </div>
        </VerifyModal>
     );
}
 
export default VerifyUserId;