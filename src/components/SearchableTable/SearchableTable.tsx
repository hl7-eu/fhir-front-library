//React
import React, { useState, useCallback } from "react";
// Components
import PaginatedTable from "./PaginatedTable";
import SearchCriteria from "./SearchCriteria";
// Props
import { PaginatedTableProperties } from "./PaginatedTable";
import { SearchCriteriaProperties } from "./SearchCriteria";

///////////////////////////////
//            Props          //
///////////////////////////////

// SearchableTable.tsx
interface SearchableTableProps {
    searchCriteriaProperties: SearchCriteriaProperties
    paginatedTableProperties: PaginatedTableProperties;
}

const SearchableTable: React.FC<SearchableTableProps> = (configs) => {

    ////////////////////////////////
    //           State            //
    ////////////////////////////////

    const [searchParams, setSearchParams] = useState<{ [key: string]: string }>(configs.searchCriteriaProperties.fixedParameters ?? {});

    ////////////////////////////////
    //          Actions           //
    ////////////////////////////////

    /**
    * Search on a resource with the search params.
    *
    * @param searchParams The search params
    */
    const onSubmit = (newSearchParams: any) => {
        if (JSON.stringify(newSearchParams) !== JSON.stringify(searchParams)) {
            setSearchParams(newSearchParams);
        }
    };

    /**
    * Reset the search params of the search criteria.
    */
    const onReset = useCallback(() => {
        setSearchParams(configs.searchCriteriaProperties.fixedParameters ?? {});
    }, [configs.searchCriteriaProperties.fixedParameters]);

    ////////////////////////////////
    //          Content           //
    ////////////////////////////////

    return (
        <div className="d-flex flex-column gap-4">
            <div>
                <SearchCriteria
                    {...configs.searchCriteriaProperties}
                    onSubmit={onSubmit}
                    onReset={onReset}
                />
            </div>
            <div>
                <PaginatedTable
                    {...configs.paginatedTableProperties}
                    searchProperties={{ ...configs.paginatedTableProperties.searchProperties, searchParameters: { ...searchParams}}}
                />
            </div>
        </div>
    );
}

export default SearchableTable;