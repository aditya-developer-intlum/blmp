/* eslint-disable react/no-array-index-key */
import React from 'react';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, CardBody, CardTitle, Badge } from 'reactstrap';

import IntlMessages from '../../../helpers/IntlMessages';

const ItemList = ({data, restaurantId, refreshList}) => {
  return (
    <Card>
      <div className="position-absolute card-top-buttons">
        <button type="button" className="btn btn-header-light icon-button" onClick={refreshList}>
          <i className="simple-icon-refresh" />
        </button>
      </div>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Menu Items" />
        </CardTitle>
        <div className="scroll dashboard-list-with-thumbs">
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            {data.map((Item, index) => {
              return (
                <div key={index} className="d-flex flex-row mb-3">
                  <NavLink
                    to={`#`}
                    className="d-block position-relative"
                  >
                    <img
                      src={'/assets/img/food-icon.png'}
                      alt={'order_title'}
                      className="list-thumbnail border-0"
                    />
                    {(() => {
                        if(Item.status===1) {
                            return (
                              <Badge
                                key={index}
                                className="position-absolute badge-top-right"
                                color={'success'}
                                pill
                              >
                                Active
                              </Badge>
                            )
                        } else {
                          return (
                            <Badge
                              key={index}
                              className="position-absolute badge-top-right"
                              color={'danger'}
                              pill
                            >
                              Inactive
                            </Badge>
                          )
                        } 
                    })()}
                  </NavLink>

                  <div className="pl-3 pt-2 pr-2 pb-2">
                    <NavLink to={`#`}>
                      <p className="list-item-heading">{Item.name}</p>
                      <div className="pr-4">
                        <p className="text-muted mb-1 text-small">
                          {Item.description}
                        </p>
                      </div>
                      <div className="text-primary text-small font-weight-medium d-none d-sm-block">
                        {(() => {
                          if(Item.veg_status===0) {return 'For Vegetarians'}
                          else if(Item.veg_status===1) {return 'For Non-Vegetarians'}
                          else if(Item.veg_status===2) {return 'For Both'}
                        })()}
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
export default ItemList;
