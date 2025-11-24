import { Bell, MessageSquareMore } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface MainHeaderProps {
    toggleSidebar: () => void
}

export function MainHeader({ toggleSidebar }: MainHeaderProps) {
    return (
        <header className="h-16 bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center justify-end">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="rounded-full border border-teal-600 w-10 h-10">
                    <MessageSquareMore className="h-10 w-10 text-teal-600" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full border border-teal-600 w-10 h-10">
                    <Bell className="h-10 w-10 text-teal-600" />
                </Button>
                <Avatar className="rounded-full border border-teal-600 w-10 h-10">
                    <AvatarImage src="https://avatar.iran.liara.run/public/14" alt="avatar of user" />
                    <AvatarFallback>AD</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}
