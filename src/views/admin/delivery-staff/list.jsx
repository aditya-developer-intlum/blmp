import React from 'react';
import { Row,Card, CardBody, CardTitle } from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';
import classnames from 'classnames';
import DatatablePagination from '../../../components/DatatablePagination';
import * as Api from '../../../services/admin/vendor';
import { Button } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import { NavLink } from 'react-router-dom';
import { NotificationManager } from '../../../components/common/react-notifications';

const Table = ({ columns, data, divided = false, defaultPageSize, deleteProduct, gotoPage ,pageIndex, pageCount, canNextPage,canPreviousPage, onSort }) => {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
    },
    useSortBy,
    usePagination
  );
  const setPageSize = (s) => { console.log(s) };
  
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
                  onClick={()=> {onSort(columns[columnIndex]['accessor'])}}
                  className={ columns[columnIndex]['sortClass'] ? 'sorted-'+columns[columnIndex]['sortClass'] : ''}
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
                   <NavLink to={`/admin/delivery-staff/update/${row.original.id}`} className="btn btn-primary">Edit</NavLink>{" "}
                   
                   <Button color="danger" onClick={()=> deleteProduct(row.original.id)}>Delete</Button>
                </td>
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
          error: null,  
          response: {},  
          CurrentPage: 1,  
          data: [],  
          filter: {  
              pageNo: 1,  
              sizePerPage: 3,
              sortParameter: {
                field: '',
                type: ''
              }
          }, 
          totalCount: 0,
          totalPage: 1,
      }  
  }
  componentDidMount() {  
    this.bindData();  
  }
  bindData() {
    Api.vendorList(this.state.filter)
    .then(async response => response.data)
    .then(async response => {
      if(response.status==='success') {
          this.setState({  
              data: response.list.data,
              totalCount: response.list.total,
              totalPage: response.list.lastPage
          });
      } else {
          this.setState({  
              data: [],
              totalCount: 0,
              totalPage: 1
          });
      }
    })
  }
  //* to do the pagination operation *//
  gotoPage = async (page) => {
    let data = await (page+1);
    let {  
        filter  
    } = this.state;  
    let tempFilter = {  
        ...filter  
    };  
    tempFilter["pageNo"] = data;  
    await this.setState({  
        filter: tempFilter  
    })
    this.bindData()
  }
  //* to do the sorting operation *//
  onSort = async(col) => {
    let {  
        filter  
    } = this.state;  
    let tempFilter = {  
        ...filter  
    };  
    if(tempFilter["sortParameter"]["field"] === col) {
      if(tempFilter["sortParameter"]["type"] === 'desc') {
        tempFilter["sortParameter"]["type"] = 'asc';
      } else if (tempFilter["sortParameter"]["type"] === 'asc') {
        tempFilter["sortParameter"]["field"] = '';
        tempFilter["sortParameter"]["type"] = '';
      }
    } else {
      tempFilter["sortParameter"]["field"] = col;
      tempFilter["sortParameter"]["type"] = 'desc';
    }
    await this.setState({  
        filter: tempFilter  
    })
    this.bindData()
  }
  deleteProduct = async(id) => {
    Api.vendorDelete(id)
    .then(async response => response.data)
    .then(async response => {
      this.bindData()
      NotificationManager.success('', 'Vendor Deletion Successful!', 3000, null, null, '');
    })
    .catch(async err => {
      NotificationManager.error('', 'Vendor Deletion Failed!', 3000, null, null, '');
    })
  }
  render() {
    const {
        filter,  
        data ,
        totalPage 
    } = this.state;
    const cols = [
        {
          Header: 'Name',
          accessor: 'name',
          cellClass: 'list-item-heading w-20',
          sortClass: filter.sortParameter.field==='name'? filter.sortParameter.type : '' //*to set the sort select class *//
        },
        {
          Header: 'Email',
          accessor: 'email',
          cellClass: 'list-item-heading w-30',
          sortClass: filter.sortParameter.field==='email'? filter.sortParameter.type : '' //*to set the sort select class *//
        },
        {
          Header: 'Phone',
          accessor: 'phone',
          cellClass: 'list-item-heading w-30',
          sortClass: filter.sortParameter.field==='phone'? filter.sortParameter.type : '' //*to set the sort select class *//
        }
      ];
    const canPreviousPage = filter.pageNo===1? false : true;  //*to set the prev page scope *//
    const canNextPage = filter.pageNo===totalPage? false : true;  //*to set the next page scope *//
    return (
      <React.Fragment>
        <Row>
          <Colxx xxs="12">
            <Card className="mb-4">
              <CardBody>
                <Row>
                  <Colxx xxs="10">
                    <CardTitle>
                      <i className="iconsminds-align-justify-all"></i>&nbsp;&nbsp;Delivery Staff List
                    </CardTitle>
                  </Colxx>
                  <Colxx xxs="2">
                    <CardTitle>
                      <NavLink to={`/${localStorage.getItem('user_type')}/delivery-staff/create`} className="btn btn-success">Create</NavLink>
                    </CardTitle>
                  </Colxx>
                </Row>
                
                <Table columns={cols} data={data} defaultPageSize={filter.sizePerPage} gotoPage={this.gotoPage}
                  pageIndex={filter.pageNo} pageCount={totalPage} canPreviousPage={canPreviousPage}
                  canNextPage={canNextPage} onSort={this.onSort} deleteProduct={this.deleteProduct} />
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </React.Fragment>
    );
  }
}
export default VendorList;