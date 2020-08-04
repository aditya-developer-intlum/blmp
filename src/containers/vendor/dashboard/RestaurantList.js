/* eslint-disable react/no-array-index-key */
import React from 'react';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, CardBody, CardTitle, Badge } from 'reactstrap';

import IntlMessages from '../../../helpers/IntlMessages';

const RestaurantList = ({List, Refresh}) => {
  const data = List
  return (
    <Card>
      <div className="position-absolute card-top-buttons">
        <button type="button" className="btn btn-header-light icon-button" onClick={Refresh}>
          <i className="simple-icon-refresh" />
        </button>
      </div>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Restaurants" />
        </CardTitle>
        <div className="scroll dashboard-list-with-thumbs">
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            {data.slice(0, 6).map((val, index) => {
              return (
                <div key={index} className="d-flex flex-row mb-3">
                  <NavLink
                    to={`/vendor/restaurant/dashboard/${val.id}`}
                    className="d-block position-relative"
                  >
                    <img
                      src={'/assets/img/restaurant-icon.png'}
                      alt={'Marble Cake'}
                      className="list-thumbnail border-0"
                    />
                    {/*<Badge
                      key={index}
                      className="position-absolute badge-top-right"
                      color={'primary'}
                      pill
                    >
                      {'2'}
                    </Badge>*/}
                  </NavLink>

                  <div className="pl-3 pt-2 pr-2 pb-2">
                    <NavLink  to={`/vendor/restaurant/dashboard/${val.id}`}>
                      <p className="list-item-heading">{val.name}</p>
                      <div className="pr-4">
                        <p className="text-muted mb-1 text-small">
                          {val.description}
                        </p>
                      </div>
                      <div className="text-primary text-small font-weight-medium d-none d-sm-block">
                        {val.region}
                      </div>
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </PerfectScrollbar>
        </div>
      </CardBody>
    </Card>
  );
};
export default RestaurantList;
