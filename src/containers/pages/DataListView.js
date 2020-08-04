import React from 'react';
import { Card } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../components/common/CustomBootstrap';
import moment from 'moment';

const DataListView = ({ category, isSelect, collect, onCheckItem }) => {
  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={category.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, category.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`?p=${category.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {category.name}
                </p>
              </NavLink>
              <p className="mb-2 text-muted text-small w-15 w-sm-100">
                {moment(category.created_at).format('DD-MM-YYYY')}
              </p>
              
            </div>
           
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);
