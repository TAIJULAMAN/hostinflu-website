"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ScheduleSectionProps {
    checkInTime: string;
    setCheckInTime: (time: string) => void;
    checkInDate: Date | undefined;
    setCheckInDate: (date: Date | undefined) => void;
    checkOutTime: string;
    setCheckOutTime: (time: string) => void;
    checkOutDate: Date | undefined;
    setCheckOutDate: (date: Date | undefined) => void;
}

export const ScheduleSection = ({
    checkInTime,
    setCheckInTime,
    checkInDate,
    setCheckInDate,
    checkOutTime,
    setCheckOutTime,
    checkOutDate,
    setCheckOutDate,
}: ScheduleSectionProps) => {
    return (
        <section>
            <Label className="text-lg font-semibold text-gray-900 mb-5">
                Schedule
            </Label>
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Check-in time
                        </label>
                        <Select value={checkInTime} onValueChange={setCheckInTime}>
                            <SelectTrigger>
                                <SelectValue placeholder="10:00 PM" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                                <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                                <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                                <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                                <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                                <SelectItem value="06:00 PM">06:00 PM</SelectItem>
                                <SelectItem value="08:00 PM">08:00 PM</SelectItem>
                                <SelectItem value="10:00 PM">10:00 PM</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Check-in date
                        </label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !checkInDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {checkInDate ? (
                                        format(checkInDate, "PPP")
                                    ) : (
                                        <span>mm/dd/yyyy</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={checkInDate}
                                    onSelect={setCheckInDate}
                                    initialFocus
                                    required
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Check-out time
                        </label>
                        <Select value={checkOutTime} onValueChange={setCheckOutTime}>
                            <SelectTrigger>
                                <SelectValue placeholder="12:00 PM" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                                <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                                <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                                <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                                <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Check-out date
                        </label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !checkOutDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {checkOutDate ? (
                                        format(checkOutDate, "PPP")
                                    ) : (
                                        <span>mm/dd/yyyy</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={checkOutDate}
                                    onSelect={setCheckOutDate}
                                    initialFocus
                                    required
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
        </section>
    );
};
