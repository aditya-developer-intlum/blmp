import React from 'react';
import { Card, CardBody, CardTitle, NavLink, Button, Row, Col, Badge } from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';
import classnames from 'classnames';
import * as Api from '../../../../../services/vendor/orders';
import DatatablePagination from '../../../../../components/DatatablePagination';
import { socket } from '../../../../../util/socket';
import { NotificationManager } from '../../../../../components/common/react-notifications';
import {Howl, Howler} from 'howler';

const notificationTone = "/assets/sound/new-order.mp3";

function Table({ columns, data, divided = false, defaultPageSize = 5, changeStatus, viewOrder }) {
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
          {page.map((row) => {
            prepareRow(row);
            //console.log(row)
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

export class Awaiting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      restaurantId: this.props.restaurantId,
      notification: 0
    }
  }
  async componentDidMount() {
    this.bindData();
    socket.on(`${this.state.restaurantId}-new-message`, this.getData);
    //socket.emit("new-message", {restaurant: this.state.restaurantId, type: "Order", msg: "New order arrived!"});
  }
  getData = async (val) => {
    //console.log(val);
    if(val.type==="new order" && val.restaurant===this.state.restaurantId) {
      let {data} = this.state
      await data.splice(0, 0, val.data);
      await this.setState({
        data: data
      });
      // let { notification } = this.state;
      // await this.setState({
      //   notification: notification+1
      // })
      await NotificationManager.info('You have received a new ORDER !', 'NEW ORDER', 3000, null, null, '');
      var sound = await new Howl({
        src: [notificationTone]
      });
      sound.play();
    }
  };
  bindData() {
    Api.allAwaiting(this.state.restaurantId)
    .then(async response => response.data)
    .then(async response => {
      this.setState({  
        data: response.data,
        notification: 0
      });
    })
  }
  viewOrder = (id) => {
    const path = `/vendor/restaurant/orders/view/${id}/${this.state.restaurantId}`
    this.props.history.push(path)
  }
  changeStatus = (id,status) => {
    console.log(id)
    console.log(status);
  }
  reload = () => {
    this.bindData();
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
        cellClass: 'list-item-heading w-30',
        Cell: (props) => <>{props.value}</>,
      },
    ];
    const { data,restaurantId } = this.state
    return (
      <>
        <Button color="primary" onClick={this.reload}>
          Refresh {/*<Badge color="danger">{this.state.notification}</Badge>*/}
        </Button>
        <Table columns={cols} data={data} divided changeStatus={this.changeStatus} viewOrder={this.viewOrder} />
      </>
    );
  }
};

