/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React, {useState,useEffect} from 'react';
import { Row,Card, CardBody, CardTitle } from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';
import classnames from 'classnames';
import DatatablePagination from '../../../components/DatatablePagination';
import { all } from '../../../services/admin/ProductService';
import { Colxx } from '../../../components/common/CustomBootstrap';
import { NavLink } from 'react-router-dom';

function Table({ columns, data,product, divided = false, defaultPageSize = 6 }) {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
    },
    useSortBy,
    usePagination
  );
  
  return (
    <React.Fragment>
      <table
        {...getTableProps()}
        className={`r-table table ${classnames({ 'table-divided': divided })}`}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`th_${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? 'sorted-desc'
                        : 'sorted-asc'
                      : ''
                  }
                >
                  {column.render('Header')}
                  <span />
                </th>
              ))}
              <th>Action</th>
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => {
                 // console.log(data[cellIndex]);
                  return (<td
                      key={`td_${cellIndex}`}
                      {...cell.getCellProps({
                        className: cell.column.cellClass,
                      })}
                    >
                      {cell.render('Cell')}
                    </td>)
                })}
                <td>
                   <NavLink to={`/admin/product/${row.original.id}/edit`} className="btn btn-primary">Edit</NavLink>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <DatatablePagination
        page={pageIndex}
        pages={pageCount}
        canPrevious={canPreviousPage}
        canNext={canNextPage}
        pageSizeOptions={[4, 10, 20, 30, 40, 50]}
        showPageSizeOptions={false}
        showPageJump={false}
        defaultPageSize={pageSize}
        onPageChange={(p) => gotoPage(p)}
        onPageSizeChange={(s) => setPageSize(s)}
        paginationMaxSize={pageCount}
      />
    </React.Fragment>
  );
}

export const ProductTable = () => {

 const [getProducts, setProducts] = useState([]);
   
  useEffect(() => {
      all().then((data) => setProducts(data.data.data));
      
  }, []);
    const products = () => {
      all().then((data) => setProducts(data.data.data));
     }
  const cols = React.useMemo(
    () => [
      {
        Header: 'Vendor',
        accessor: 'vendor.email',
        cellClass: 'list-item-heading w-20',
      },
      {
        Header: 'Category Name',
        accessor: 'category.name',
        cellClass: 'list-item-heading w-30',
      },
      {
        Header: 'Product Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-30',
      }
    ],
    []
  );
 console.log(getProducts);
  return (
    <React.Fragment>
    <Card className="mb-4">
      <CardBody>
        <Row>
				<Colxx xxs="10">
				 <CardTitle>
          Products
        </CardTitle>
				</Colxx>
        
			</Row>
       
        <Table columns={cols} data={getProducts} product={products}/>
      </CardBody>
    </Card>
    </React.Fragment>
  );
};
