"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useRouter } from "next/navigation";

interface PokemonPaginationProps {
  currentPage:number;
  totalPages:number;
  // params: {page?: string, type?:string}
}

export default function PokemonPagination({currentPage, totalPages}:PokemonPaginationProps) {
  const router = useRouter()
  const PAGE_GROUP_SIZE = 10;
  const currentGroup = Math.floor( (currentPage-1)/ PAGE_GROUP_SIZE)
  const startPage = currentGroup * PAGE_GROUP_SIZE + 1
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE-1, totalPages)

  const hasPrevGroup = startPage > 1;
  const hasNextGroup = endPage < totalPages;

  const prevGroupPage = startPage - 1;
  const nextGroupPage = endPage + 1;

  const handlePageChange = (page:number) => {
    router.push(`/?page=${page}`)
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            // href={currentPage > 1 ? buildPageUrl(prevGroupPage) : undefined} 
            onClick={()=>currentPage > 1  && handlePageChange(prevGroupPage)}
            className={!hasPrevGroup ? 'invisible' : 'cursor-pointer cursor-target'}
          />
        </PaginationItem>
        {Array.from({length: endPage - startPage + 1}).map( (_,i) => {
          const pageNum = startPage + i
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                onClick={()=>handlePageChange(pageNum) }
                isActive={currentPage === pageNum}
                className='cursor-pointer cursor-target'
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        <PaginationItem>
          <PaginationNext
            onClick={()=>(currentPage < totalPages ? handlePageChange(nextGroupPage) : undefined)} 
            className={!hasNextGroup ? 'invisible' : 'cursor-pointer cursor-target'}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
