import React from 'react';
import { Row } from 'reactstrap';
//import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
//import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { getRequest } from '../../../helpers/ApiService';

class BlankPage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  addItem() {
    getRequest('product')
    .then(async response => {
      console.log(await response);
    })
    .catch(async error => {
      console.log(await error);
    });
  }
  render() {
    return (
      <>
        <Row>
          <Colxx xxs="12">
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" className="mb-4">
            <p>
              <button onClick={()=> this.addItem()}>Go!</button>
            </p>
          </Colxx>
        </Row>
      </>
    );
  }
};

export default BlankPage;
