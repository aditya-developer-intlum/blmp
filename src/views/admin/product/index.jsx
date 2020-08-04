import React from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import { ProductTable } from './ProductTable';


const Product = () => {

  return (
    <React.Fragment>
      <Row>
        <Colxx xxs="12">
          <ProductTable/>
        </Colxx>
      </Row>
    </React.Fragment>
  )
}
export default Product;