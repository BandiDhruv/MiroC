"use client"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger,DropdownMenuSeparator,} from "@/components/ui/dropdown-menu"
import { toast } from "sonner";
import {useApiMutation} from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api";
import {ConfirmModal} from "@/components/confirm-modal"
import { Button } from "@/components/ui/button";
import { useRenameModal } from "@/store/use-rename-modal";
interface ActionsProps{
    children:React.ReactNode;
    side?:DropdownMenuContentProps["side"];
    sideOffset?:DropdownMenuContentProps["sideOffset"];
    id:string;
    title:string;
};
export const Actions = ({
    children, 
    side,  
    sideOffset, 
    id,  
    title
}:ActionsProps) =>{
    const {mutate,pending}=useApiMutation(api.board.remove);
    const {onOpen} = useRenameModal();
    const onCopyLink=()=>{
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`,)
        .then(()=>toast.success("Link Copied"))
        .catch(()=>toast.error("Failed to Copy Link"))

    }

    const onDelete = () =>{
        mutate({id})
        .then(()=>toast.success("Board deleted"))
        .catch(()=>toast.error("Failed to delete board"))
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side={side}
                sideOffset={sideOffset}
                onClick={(e)=>{e.stopPropagation()}}
                className="w-60"
            >
                <DropdownMenuItem 
                className="p-3 cursor-pointer"
                onClick={onCopyLink}
                >
                    <Link2 className="h-4 2-4 mr-2"/>Copy Board Link
                </DropdownMenuItem>
                <DropdownMenuItem 
                className="p-3 cursor-pointer"
                onClick={()=>onOpen(id,title)}
                >
                    <Pencil className="h-4 2-4 mr-2"/>Rename
                </DropdownMenuItem>
                <ConfirmModal
                    header="Delete Board?"
                    description="This Will delete the board and all of its content"
                    disabled= {pending}
                    onConfirm={onDelete}
                >
                    <Button 
                    variant="ghost"
                    className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
                    >
                        <Trash2 className="h-4 2-4 mr-2"/>
                        Delete
                    </Button>
                </ConfirmModal>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}