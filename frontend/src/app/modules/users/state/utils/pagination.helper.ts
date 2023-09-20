import { Pagination } from '../models/pagination.model';

export const changeActivePaginationNumber = (
    paginationNumber: number,
    paginationNumbersArray: Pagination[]
): Pagination[] => {
    const newPaginationNumbersArray = [...paginationNumbersArray].map(
        (item: Pagination, index) => {
            if (item.isActive) {
                return {
                    ...item,
                    isActive: false,
                };
            }

            if (index === paginationNumber - 1) {
                return {
                    ...item,
                    isActive: true,
                };
            }

            return item;
        }
    );

    return newPaginationNumbersArray;
};
