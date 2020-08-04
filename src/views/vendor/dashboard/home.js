import React from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import IconCardsCarousel from '../../../containers/vendor/dashboard/IconCardsCarousel';
import RestaurantList from '../../../containers/vendor/dashboard/RestaurantList';
import SalesChartCard from '../../../containers/vendor/dashboard/SalesChartCard';
import * as Api from '../../../services/vendor/restaurants';

class BlankPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {  
    this.bindData();  
  }
  bindData() {
    Api.restaurantAllList()
    .then(async response => response.data)
    .then(async response => {
      this.setState({  
        data: response
      });
    })
  }
  refresh = () => {
    this.bindData();
  }
  render() {
    const {data} = this.state;
    return (
      <>
        <Row>
          <Colxx lg="12" xl="6">
            <IconCardsCarousel />
            <Row>
              <Colxx md="12" className="mb-4">
                <SalesChartCard />
              </Colxx>
            </Row>
          </Colxx>
          <Colxx lg="12" xl="6" className="mb-4">
            <RestaurantList List={data} Refresh={this.refresh} />
          </Colxx>
        </Row>
      </>
    );
  }
};

export default BlankPage;
