// React
import React, { useEffect, useState } from 'react';
// React Bootstrap
import { Table, Pagination, Dropdown } from 'react-bootstrap';
// Style
import './PaginatedTable.css';
// Font Awesome
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// FHIR
import Client from 'fhir-kit-client';
import { Bundle } from 'fhir/r5';
// Components
import Loader from '../../Loader';

///////////////////////////
//      Properties       //
///////////////////////////

export interface PaginatedTableProperties {
    // Columns of the table
    columns: {
        header: string
        dataField: string,
        width?: string,
        tabletWidth?: string,
        formatter?: ((cell: any, row: any) => JSX.Element)
    }[];
    // Action on the icon of the table
    action?: {
        // Choose the icon of the action
        icon?: IconProp,
        onClick?: (id: string, event: any) => void,
        // Or choose a component to render
        component?: JSX.Element,
        // Display an icon
        display?: (item: any) => boolean,
    }[];
    // Function to map the resource to the data
    mapResourceToData: (resource: any) => any | Promise<any>;
    // Props of the search function
    searchProperties: {
        serverUrl: string;
        resourceType: string;
        searchParameters?: { [key: string]: string };
    };
    // Function to call when an error occurs
    onError: () => void;
}

const PaginatedTable: React.FC<PaginatedTableProperties> = (configs) => {

    ////////////////////////////////
    //           State            //
    ////////////////////////////////

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [bundle, setBundle] = useState<Bundle | null>(null);

    ////////////////////////////////
    //          Client           //
    ////////////////////////////////

    const fhirClient = new Client({
        baseUrl: configs.searchProperties.serverUrl ?? 'fhir'
    });

    ////////////////////////////////
    //          Actions           //
    ////////////////////////////////

    /**
     * Search on a resource with the search params.
     *
     * @param searchParams The search params
     */
    const searchOnResourceWithParams = async (searchParams: { [key: string]: string }) => {
        setLoading(true);
        try {
            const response = await fhirClient.search({
                resourceType: configs.searchProperties.resourceType,
                searchParams: { ...searchParams, _count: resultsPerPage, _getpagesoffset: (currentPage - 1) * resultsPerPage, }
                // This is removed until fixed in the backend
                // _total: 'accurate' }
            });
            if (response.resourceType !== 'Bundle') {
                throw Error(response.statusText);
            }
            const bundle: Bundle = response as Bundle;
            setBundle(bundle);
            const results = bundle.entry?.filter(entry =>
                entry.resource?.resourceType === configs.searchProperties.resourceType).map(entry =>
                    entry.resource).map(resource => Promise.resolve(configs.mapResourceToData(resource))) ?? [];
            setData(await Promise.all(results));
            setHasNextPage(!!bundle.link?.find(link => link.relation === 'next'));
            if (results.length === 0) {
                setCurrentPage(1);
            }
        } catch (error) {
            configs.onError();
        } finally {
            setLoading(false);
        }
    }

    ////////////////////////////////
    //         Lifecycle          //
    ////////////////////////////////

    /**
     * Search on the resource with the search params when the component is mounted.
     */
    useEffect(() => {
        searchOnResourceWithParams(configs.searchProperties.searchParameters ?? {});
    }, [JSON.stringify(configs.searchProperties.searchParameters), currentPage, resultsPerPage]);

    ////////////////////////////////
    //           Content          //
    ////////////////////////////////

    return (
        loading ?
            <div>
                <Loader />
            </div>
            :
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {configs.columns?.map((column, index) => (
                                <th
                                    className="cellContent"
                                    key={index}
                                    style={{
                                        width: window.innerWidth <= 991 ? column.tabletWidth ?? 'auto' : column.width
                                    } as React.CSSProperties}
                                >
                                    {column.header}
                                </th>
                            ))}
                            {configs.action?.length ?
                                <th className="cellContent">
                                    Actions
                                </th>
                                : null}
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item: any, index: any) => (
                            <tr key={index}>
                                {configs.columns?.map((column, index) => (
                                    <td
                                        key={index}
                                        className="cellContent"
                                        style={{
                                            width: window.innerWidth <= 991 ? column.tabletWidth ?? 'auto' : column.width
                                        } as React.CSSProperties}
                                    >
                                        {column.formatter
                                            ? column.formatter(item[column.dataField], item)
                                            : typeof item[column.dataField] === 'object'
                                                ? JSON.stringify(item[column.dataField])
                                                : item[column.dataField]}
                                    </td>
                                ))}
                                {configs.action?.length ?
                                    <td className="align-middle">
                                        <div className='d-flex flex-wrap gap-2'>
                                            {configs.action.map((action, index) => {
                                                return ((!action.display) || action.display(item)) ?
                                                    action.component
                                                        ? action.component
                                                        : <FontAwesomeIcon
                                                            key={index}
                                                            id={item.id ? `icon-${item.id}` : undefined}
                                                            className="icon-mixed"
                                                            icon={action.icon!}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                action.onClick!(item.id, e)
                                                            }}
                                                        />
                                                    :
                                                    <></>
                                            }
                                            )}
                                        </div>
                                    </td>
                                    : null
                                }
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-between align-items-center">
                    <Dropdown onSelect={(eventKey: any) => {
                        setResultsPerPage(Number(eventKey));
                        setCurrentPage(1);
                    }}>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{minWidth: 0}}>
                            {resultsPerPage}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdownMenu">
                            <Dropdown.Item eventKey="10">10</Dropdown.Item>
                            <Dropdown.Item eventKey="20">20</Dropdown.Item>
                            <Dropdown.Item eventKey="30">30</Dropdown.Item>
                            <Dropdown.Item eventKey="40">40</Dropdown.Item>
                            <Dropdown.Item eventKey="50">50</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Pagination>
                        <Pagination.First
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                        />
                        <Pagination.Prev
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                        />
                        <Pagination.Item active>{currentPage}</Pagination.Item>
                        <Pagination.Next
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            disabled={!hasNextPage}
                        />
                        <Pagination.Last
                            onClick={() => {
                                if (bundle && bundle.total !== undefined) {
                                    setCurrentPage(Math.ceil(bundle.total / resultsPerPage));
                                }
                            }}
                            disabled={true}
                        />
                    </Pagination>
                </div>
            </div >
    );
};

export default PaginatedTable;