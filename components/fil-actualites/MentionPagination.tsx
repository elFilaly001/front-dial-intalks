"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

type MentionPaginationProps = {
  pagination: {
    total: number;
    page: number;
    totalPages: number;
    pageSize: number;
  };
};

function MentionPagination({ pagination }: MentionPaginationProps) {
  const searchParams = useSearchParams();

  const createPageLink = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  const pages = [];
  const maxPagesToShow = 5;
  const { page, totalPages } = pagination;

  const start = Math.max(1, page - Math.floor(maxPagesToShow / 2));
  const end = Math.min(totalPages, start + maxPagesToShow - 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={page > 1 ? createPageLink(page - 1) : "#"}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href={createPageLink(p)}
              isActive={p === page}
              className={p === page ? "text-black" : ""}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {end < totalPages && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={createPageLink(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            href={page < totalPages ? createPageLink(page + 1) : "#"}
            className={
              page === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default MentionPagination;
