import React from 'react';
import { Row,Card, CardBody, CardTitle } from 'reactstrap';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTable, usePagination, useSortBy } from 'react-table';
import classnames from 'classnames';
import DatatablePagination from '../../../../components/DatatablePagination';
import * as Api from '../../../../services/vendor/ResturentMenuQty';
import { Button } from 'reactstrap';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { NavLink } from 'react-router-dom';
import { NotificationManager } from '../../../../components/common/react-notifications';
import '../../../../assets/css/custom.css';

const Table = ({ columns, data, divided = false, defaultPageSize, deleteItem, permission }) => {
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
              <th className="action-header">Status</th>
              <th className="action-header">Action</th>
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => {
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
                    {(() => {
                          if (row.original.status===1) {
                              return (
                                <Button color="success" onClick={()=> console.log(row.original.status)}>Active</Button>
                              )
                          } else {
                            return (
                              <Button color="danger" onClick={()=> console.log(row.original.status)}>Inactive</Button>
                            )
                          }
                      })()}
                </td>
                {(() => {
                  if (permission==="3") {
                    return(
                      <td>
                        <NavLink to={`/staff/menu/quantity_group/update/${row.original.id}`} className="btn btn-primary">Edit</NavLink>{" "}
                        
                        <Button color="danger" onClick={()=> deleteItem(row.original.id)}>Delete</Button>
                      </td>
                    );
                  } else {
                    return(
                      <td>
                        <NavLink to={`/staff/menu/quantity_group/view/${row.original.id}`} className="btn btn-primary">View</NavLink>{" "}
                      </td>
                    )
                  }
                })()}
              </tr>
            );
          })}
        </tbody>
      </table>

      <DatatablePagination
        page={pageIndex-1}
        pages={pageCount}
        canPrevious={canPreviousPage}
        canNext={canNextPage}
        pageSizeOptions={[4, 10, 20, 30, 40, 50]}
        showPageSizeOptions={false}
        showPageJump={false}
        defaultPageSize={defaultPageSize}
        onPageChange={gotoPage}
        onPageSizeChange={(s) => setPageSize(s)}
        paginationMaxSize={pageCount}
      />
    </React.Fragment>
  );
}
class VendorList extends React.Component {
  constructor(props) {  
      super(props);  
      this.state = {
        data: [],  
        filter: {  
          sizePerPage: 3,
        }, 
        restaurantId: localStorage.getItem('restaurant_id'),
        permission: JSON.parse(this.props.permissionList)[0]['status']
      }  
  }
  componentDidMount() {  
    this.bindData();  
  }
  bindData() {
    Api.all(this.state.restaurantId)
    .then(async response => response.data)
    .then(async response => {
      this.setState({  
          data: response,
      });
    })
  }
  
  deleteItem = async(id) => {
    Api.destroy(id)
    .then(async response => response.data)
    .then(async response => {
      this.bindData()
      NotificationManager.success('', 'Restaurant Deletion Successful!', 3000, null, null, '');
    })
    .catch(async err => {
      NotificationManager.error('', 'Restaurant Deletion Failed!', 3000, null, null, '');
    })
  }
  render() {
    const {
        filter,  
        data ,
        restaurantId,
        permission
    } = this.state;
    const cols = [
      {
        Header: 'Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-20',
      }
    ];
    return (
      <React.Fragment>
        <Row>
          <Colxx xxs="12">
            <Card className="mb-4">
              <CardBody>
                <Row>
                  <Colxx xxs="10">
                    <CardTitle>
                      <i className="iconsminds-align-justify-all"></i>&nbsp;&nbsp;Quantity Group List
                    </CardTitle>
                  </Colxx>
                </Row>
                
                <Table columns={cols} data={data} defaultPageSize={filter.sizePerPage} deleteItem={this.deleteItem} permission={permission} />
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { permissions: permissionList } = authUser;
  return { permissionList };
};

export default withRouter(connect(mapStateToProps, {})(VendorList));