import React from 'react';
import { Row } from 'reactstrap';
import Pagination from './Pagination';
import ContextMenuContainer from './ContextMenuContainer';
import DataListView from './DataListView';

function collect(props) {
  //console.log(props.data);
  return { data: props.data };
}

const ListPageListing = ({
  items,
  displayMode,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
}) => {
  return (
    <Row>
      {items.map((category) => {
        return (
          <DataListView
            key={category.id}
            category={category}
            isSelect={selectedItems.includes(category.id)}
            onCheckItem={onCheckItem}
            collect={collect}
          />
        );

      })}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
      <ContextMenuContainer
        onContextMenuClick={onContextMenuClick}
        onContextMenu={onContextMenu}
      />
    </Row>
  );
};

export default React.memo(ListPageListing);
