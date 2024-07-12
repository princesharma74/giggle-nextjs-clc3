import RatingChangeCard from "./rating_change_card";
import { RatingChange } from "@/types";
import { useState, useEffect, useCallback } from "react";
import NoResults from "@/components/ui/no-result";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.API_TOKEN}`
};

interface RatingChangeListViewProps {
  user_email: string,
}

const RatingChangeListView: React.FC<RatingChangeListViewProps> = ({ user_email }) => {
  const [ratingChanges, setRatingChanges] = useState<RatingChange[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const size = 5;
  const fetchRatingChanges = useCallback(async (page: number) => {
    const response = await fetch(`/api/users/${user_email}/ratingchange?page=${page}&size=${size}`, { headers });
    const data = await response.json();
    setRatingChanges(data.results);
    setTotalPages(data.pagination.totalPages);
  }, [user_email, size]);

  useEffect(() => {
    fetchRatingChanges(currentPage);
  }, [currentPage, fetchRatingChanges]);

  const handlePageChange = (event: React.MouseEvent, page: number) => {
    event.preventDefault();
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {ratingChanges.length > 0 ? (
        <>
          {ratingChanges.map((ratingChange) => (
            <div key={ratingChange.contest_title} className="w-full"><RatingChangeCard data={ratingChange} /></div>
          ))}
          <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={(event) => handlePageChange(event, Math.max(currentPage - 1, 1))} />
              </PaginationItem>
              {[1, 2, 3].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink href="#" onClick={(event) => handlePageChange(event, index + 1)}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" onClick={(event) => handlePageChange(event, Math.min(currentPage + 1, totalPages))} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
          </>
      ) : (
        <NoResults message={`No rating changes available or make sure you are signed in.`} />
      )}
    </div>
  );
};

export default RatingChangeListView;
