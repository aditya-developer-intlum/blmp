import React from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';
import IconCardsCarousel from '../../containers/vendor/restaurant/IconCardsCarousel';
import ItemList from '../../containers/vendor/restaurant/ItemListStaff';
import SalesChartCard from '../../containers/vendor/restaurant/SalesChartCard';
import * as Api from '../../services/vendor/ResturentMenuItems';

class BlankPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],  
      restaurantId: localStorage.getItem('restaurant_id'),
    }
  }
  componentDidMount() {
    this.bindData();  
  }
  bindData() {
    Api.all(this.state.restaurantId)
    .then(async response => response.data)
    .then(async response => {
      this.setState({  
          data: response,
      });
    })
  }
  refresh = () => {
    this.bindData();
  }
  render() {
    const { data, restaurantId } = this.state;
    return (
      <>
        <Row>
          <Colxx lg="12" xl="6" className="mb-4">
            <ItemList data={data} restaurantId={restaurantId} refreshList={this.refresh} />
          </Colxx>
          <Colxx lg="12" xl="6">
            <IconCardsCarousel />
            <Row>
              <Colxx md="12" className="mb-4">
                <SalesChartCard />
              </Colxx>
            </Row>
          </Colxx>
        </Row>
      </>
    );
  }
};

export default BlankPage;
