"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onDone: () => void;
}

export const SuccessModal = ({ open, setOpen, onDone }: SuccessModalProps) => {
    return (
        <Dialog 
            open={open} 
            onOpenChange={(val) => {
                setOpen(val);
                if (!val) onDone();
            }}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Collaboration Request Sent</DialogTitle>
                    <DialogDescription>
                        Your collaboration request has been sent successfully. The influencer will be notified.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <Button
                        className="bg-teal-500 hover:bg-teal-600 text-white"
                        onClick={() => {
                            setOpen(false);
                            onDone();
                        }}
                    >
                        Done
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
