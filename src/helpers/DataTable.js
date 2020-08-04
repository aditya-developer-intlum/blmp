import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
//import { Search } from 'react-bootstrap-table2-toolkit';
import filterFactory from 'react-bootstrap-table2-filter';
import '../assets/css/custom.css';

//const { SearchBar, ClearSearchButton } = Search;

//export default function Pagination({ data, page, sizePerPage, onTableChange, totalSize, columns, onSearch, onSearchClear}) {  
export default function Pagination({ data, page, sizePerPage, onTableChange, totalSize, columns}) {
   const rowStyle = (row, rowIndex) => {
      const style = {};
    
      return style;
   };
   function indication() {
      return "Table is Empty";
   }
   // const defaultSorted = [{
   //    dataField: 'id',
   //    order: 'asc'
   // }];
   const defaultSorted = [];
   return (  
      <div>  
         <PaginationProvider  
            pagination={  
               paginationFactory({  
                  custom: true,  
                  page,  
                  sizePerPage,  
                  totalSize  
               })  
            }  
         >  
            {  
               ({  
                  paginationProps,  
                  paginationTableProps  
               }) => (  
                  <div> 
                     {/* <SearchBar onSearch={onSearch} { ...paginationTableProps.searchProps } />
                     <ClearSearchButton onClear={onSearchClear} { ...paginationTableProps.searchProps } /> */}
                     <BootstrapTable  
                        remote  
                        bootstrap4 
                        keyField="id"  
                        data={data}  
                        columns={columns} 
                        rowStyle={ rowStyle } 
                        noDataIndication={ indication }
                        onTableChange={onTableChange} 
                        defaultSorted={ defaultSorted }  
                        {...paginationTableProps}  
                        filter={ filterFactory() }
                     />  
                     <div>  
                        <PaginationListStandalone  {...paginationProps}  />  
                     </div>  
                  </div>  
               )  
            }  
         </PaginationProvider>  
      </div>  
   )  
}

/************************************** Custom Filter **********************************************/

export function TextFilter({ column, onFilter, input=''}) {
   function filter() {
       onFilter(input, column.text);
   }
   function updateInput(change) {
       input = change;
   }
   function handleChildClick(e) {
       e.stopPropagation();
   }
   return (
       <>
           <table className="w100p" onClick={handleChildClick}>
               <tbody>
                    <tr>
                        <td width="80%" className="no-border padding-t0 padding-b0 padding-l0">
                            <input
                               type="text"
                               className="form-control"
                               placeholder="Search"
                               name="name"
                               onChange={event=> updateInput(event.target.value)}
                            />
                        </td>
                        <td width="20%" className="no-border padding-t0 padding-b0 padding-l0">
                           <button key="submit" className="btn btn-success" onClick={filter}> 
                                <i className="iconsminds-magnifi-glass"></i>
                            </button>
                        </td>
                   </tr>
               </tbody>
           </table>
       </>
   );
}
export function SelectFilter({ column, onFilter, options}) {
   function updateInput(change) {
       onFilter(change, column.text);
   }
   function handleChildClick(e) {
       e.stopPropagation();
   }
   return (
       <>
           <table className="w100p" onClick={handleChildClick}>
               <tbody>
                   <tr>
                       <td width="100%" className="no-border padding-t0 padding-b0">
                           <select
                               className="form-control"
                               placeholder="Search"
                               name="name"
                               onChange={event=> updateInput(event.target.value)}
                           >
                           {
                               options.map((item, i)=> {
                                   return(
                                       <option key={i} value={item.value}>{item.name}</option>
                                   );
                               })
                           }
                           </select>
                       </td>
                   </tr>
               </tbody>
           </table>
       </>
   );
}
export function NoFilter({ none }) {
   return (
       <>
           <div className="no-filter-height">
               
           </div>
       </>
   );
}