import React from 'react';
import { Row } from 'reactstrap';
import Pagination from '../../../containers/pages/Pagination';
import ContextMenuContainer from '../../../containers/pages/ContextMenuContainer';
import DataListView from '../../../containers/pages/DataListView';

function collect(props) {
  //console.log(props.data);
  return { data: props.data };
}

const Listing = ({
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
      {items.map((productAttribute) => {
        return (
          <DataListView
            key={productAttribute.id}
            category={productAttribute}
            isSelect={selectedItems.includes(productAttribute.id)}
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

export default React.memo(Listing);
