import React, { useState } from 'react';
import { Card, CardBody, CardTitle, NavLink, Button, Row, Col, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';
import classnames from 'classnames';
import * as Api from '../../../../../services/vendor/orders';
import DatatablePagination from '../../../../../components/DatatablePagination';
import { NotificationManager } from '../../../../../components/common/react-notifications';

function Table({ columns, data, divided = false, defaultPageSize = 5, changeStatus, viewOrder, toggleIsOpen, current_status_loading }) {
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
  const StatusArray = ["On Waiting","Preparing","Cooked","Awaiting Pickup","Out For Delivery"]
  return (
    <>
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
          {page.map((row,pi) => {
            prepareRow(row);
            //console.log(pi)
            return (
              <tr {...row.getRowProps()}>
                {
                  row.cells.map((cell, cellIndex) => {
                    if(cell.column.Header==="Price") {
                      return (
                        <td
                          key={`td_${cellIndex}`}
                          {...cell.getCellProps({
                            className: cell.column.cellClass,
                          })}
                        >
                          {`₹ ${row.original.payment.total_price}`}
                        </td>
                      )
                    } else if(cell.column.Header==="Placed At") {
                      return (
                        <td
                          key={`td_${cellIndex}`}
                          {...cell.getCellProps({
                            className: cell.column.cellClass,
                          })}
                        >
                          {`${new Date(row.original.created_at).getDate()}/`}
                          {`${new Date(row.original.created_at).getMonth()+1}/`}
                          {`${new Date(row.original.created_at).getFullYear()} - `}
                          {new Date(row.original.created_at).toLocaleTimeString()}
                        </td>
                      )
                    } else {
                      return (
                        <td
                          key={`td_${cellIndex}`}
                          {...cell.getCellProps({
                            className: cell.column.cellClass,
                          })}
                        >
                          {cell.render('Cell')}
                        </td>
                      )
                    }
                  })
                }
                <td>
                  <Button color="primary" onClick={()=> viewOrder(row.original.id)}>View</Button>{" "}
                  <ButtonDropdown isOpen={row.original.toggleMenu} toggle={() => toggleIsOpen(pi)}
                    className={`btn-multiple-state ${
                      current_status_loading.id===row.original.id && current_status_loading.status ? 'show-spinner' : ''
                    }`}
                  >
                    <DropdownToggle caret>
                      <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                      </span>
                      <span className="label">
                        {StatusArray[row.original.current_status]}
                      </span>
                    </DropdownToggle>
                    <DropdownMenu>
                      {StatusArray.map((pVal,pKey) => {
                        if(pKey>=row.original.current_status) {
                          return (
                            <DropdownItem key={pKey} onClick={()=>changeStatus(pi,row.original.id,pKey)}>{pVal}</DropdownItem>
                          )
                        }
                      })}
                    </DropdownMenu>
                  </ButtonDropdown>
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
        pageSizeOptions={[5, 10, 20, 30, 40, 50]}
        showPageSizeOptions={true}
        showPageJump={false}
        defaultPageSize={pageSize}
        onPageChange={(p) => gotoPage(p)}
        onPageSizeChange={(s) => setPageSize(s)}
        paginationMaxSize={pageCount}
      />
    </>
  );
}

export class Confirmed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      restaurantId: this.props.restaurantId,
      current_status_loading: {
        id: 0,
        status: false
      }
    }
  }
  componentDidMount() {  
    this.bindData();  
  }
  bindData() {
    Api.allConfirmed(this.state.restaurantId)
    .then(async response => response.data)
    .then(async response => {
      let list = await response.data;
      await list.map((val)=>{
        val.toggleMenu = false;
      })
      await this.setState({  
        data: list,
      });
    })
  }
  viewOrder = (id) => {
    const path = `/vendor/restaurant/orders/view/${id}/${this.state.restaurantId}`
    this.props.history.push(path)
  }
  changeStatus = async (key,id,status) => {
    console.log(key)
    console.log(id)
    console.log(status);
    await this.setState({
      current_status_loading: {
        id: id,
        status: true
      }
    })
    Api.changeCurrentStatus(id, {status: status})
    .then(async response => response.data)
    .then(async response => {
      let {data} = this.state
      data[key]['current_status'] = status
      await this.setState({
        data: data,
        current_status_loading: {
          id: 0,
          status: false
        }
      })
      NotificationManager.success('', 'Status Updated Successfully!', 3000, null, null, '');
    })
  }
  reload = () => {
    this.bindData();
  }
  toggleIsOpen = async (key) => {
    let {data} = this.state
    data[key]['toggleMenu'] = !data[key]['toggleMenu']
    this.setState({
      data: data
    })
  }
  render() {
    const cols = [
      {
        Header: 'Order ID',
        accessor: 'id',
        cellClass: 'list-item-heading w-20',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Price',
        accessor: 'stock',
        cellClass: 'list-item-heading w-15',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Placed At',
        accessor: 'created_at',
        cellClass: 'list-item-heading w-20',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Remarks',
        accessor: 'remarks',
        cellClass: 'list-item-heading w-25',
        Cell: (props) => <>{props.value}</>,
      },
    ];
    const { data,restaurantId,current_status_loading } = this.state
    return (
      <>
        <Button color="primary" onClick={this.reload}>
          Refresh {/*<Badge color="danger">{this.state.notification}</Badge>*/}
        </Button>
        <Table columns={cols} data={data} divided changeStatus={this.changeStatus} current_status_loading={current_status_loading} viewOrder={this.viewOrder} toggleIsOpen={this.toggleIsOpen} />
      </>
    );
  }
};

