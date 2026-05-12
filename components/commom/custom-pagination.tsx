"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface CustomPaginationProps {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
}

export const CustomPagination = ({ page, totalPages, setPage }: CustomPaginationProps) => {
    if (totalPages <= 1) return null;

    return (
        <div className="mt-12">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (page > 1) setPage(page - 1);
                            }}
                            className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>

                    {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i + 1}>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(i + 1);
                                }}
                                isActive={page === i + 1}
                                className="cursor-pointer"
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (page < totalPages) setPage(page + 1);
                            }}
                            className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};
