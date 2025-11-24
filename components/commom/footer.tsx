import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-foreground text-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="font-bold text-xl">Hostinflu</span>
                        </div>
                        <p className="text-sm opacity-75">Connecting hosts with creators worldwide</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm opacity-75">
                            <li>
                                <Link href="#" className="hover:opacity-100">
                                    Browse
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:opacity-100">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:opacity-100">
                                    Security
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm opacity-75">
                            <li>
                                <Link href="#" className="hover:opacity-100">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:opacity-100">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:opacity-100">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm opacity-75">
                            <li>
                                <Link href="#" className="hover:opacity-100">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:opacity-100">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:opacity-100">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-background/20 pt-8 text-center text-sm opacity-75">
                    <p>&copy; 2025 Hostinflu. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
