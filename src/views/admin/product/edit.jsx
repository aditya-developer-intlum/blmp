import React from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import FormEdit from './FormEdit';


const Edit = ({match}) => {
	return (
		<React.Fragment>
			<Row>
        		<Colxx xs="12">
          			<FormEdit edit={match.params.edit}/>
        		</Colxx>
      		</Row>
		</React.Fragment>
	);
}

export default Edit;