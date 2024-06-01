"use client"

import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription 
} from "@/components/ui/dialog";
import { Platform } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";

function getLocation(platform: Platform, user: any){
    var location = "";
    switch(platform){
        case Platform.codeforces:
            location =  "https://codeforces.com/settings/social";
            break
        case Platform.codechef:
            location = `https://www.codechef.com/users/${user?.codechef_id}/edit`;
            break
        case Platform.leetcode:
            location = "https://leetcode.com/profile/";
            break
    }
    return location;
}

function getPlace(platform: Platform, user: any){
    var place = "";
    switch(platform){
        case Platform.codeforces:
            place = `"First name"`
            break
        case Platform.codechef:
            place = `"Your Name"`
            break
        case Platform.leetcode:
            place = `"Summary"`
            break
    }
    return place;
}

interface VerifyModalProps{
    title: string;
    platform: Platform;
    isOpen: boolean; 
    onClose: () => void; 
    children?: React.ReactNode;
};

export const VerifyModal: React.FC<VerifyModalProps> = ({
        title, 
        platform,
        isOpen, 
        onClose, 
        children
}) => {
    const onChange = (open: boolean) =>{
        if(!open){
            onClose();
        }
    };

    const user = useSession().data?.user;

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        Please verify your {platform} ID by entering the following at place of your {getPlace(platform, user)} in the {platform} profile settings.
                        <br/>
                        <br/>
                        <a target="_blank" href={getLocation(platform, user)}>Click here: <u>{getLocation(platform, user)}</u></a>
                    </DialogDescription>
                </DialogHeader>
                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}