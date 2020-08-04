import React ,{ useState ,useEffect}from 'react';
import {
  AvForm,
  AvGroup,
  AvInput,
  AvField,
  AvFeedback,
} from 'availity-reactstrap-validation';

import { Button, Label, Card, CardBody, Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import { category,productAttribute } from '../../../services/CommonServices';
import { getDataById, update } from '../../../services/vendor/ProductService';
import { NotificationManager } from '../../../components/common/react-notifications';

const initialState = {
  product_attribute_id: '',
  product_attribute:'',
  name:'',
  sku:'',
  price:''
};
const initialMainState = {
  category_id:'',
  product_name:''
}; 
const FormEdit = ({edit}) => {

/*initialize*/
  const [getCategory,setCategory] = useState([]);
  const [getProductAttribute,setProductAttribute] = useState([]);
  const [state, setState] = useState(initialState);
  const [mainState, setMainState] = useState(initialMainState);
  const [variant, setVariant] = useState([]);
  const [getEdit,setEdit] = useState([]);

  /*call API*/
  useEffect(() => {
      category().then(data => setCategory(data.data.data));
      productAttribute().then(data => setProductAttribute(data.data.data));
      getDataById(edit).then(data => {
          let editData =[];
        data.data.data.productVariant.forEach((data) => {
        
          editData.push({
              product_attribute_id: data.productAttributes[0].id,
              product_attribute: data.productAttributes[0].name,
              name: data.name,
              sku: data.sku,
              price: data.price
          });
        //console.log(data);
        });
        setVariant(editData);
        setMainState({
          category_id: data.data.data.category_id,
          product_name: data.data.data.name
        })
        setEdit(data.data.data)

      });
  }, []);
 
  const isEmpty = (obj) => {
    for (var key in obj) {
      
        if (obj[key] === null || obj[key] === "")
            return true;
    }
    return false;
  }
  const isIterable = (obj) => {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }


  /*Add Items*/
  const addItem = async() => {
    
    const data = {
      product_attribute_id: state.product_attribute_id,
      product_attribute: state.product_attribute,
      name: state.name,
      sku: state.sku,
      price: state.price
    };
      
    if (!isEmpty(data)) {
        await setVariant([...variant,data]);
        setState(initialState);
    }else{
        NotificationManager.error(
          'All fields are required',
          'Notification',
          3000,
          null,
          null,
          'error'
        );
    }
    
    
  }

  /*Remove Items*/
  const removeItem = (data) => {

    setVariant(variant.filter(item => item!==data));
  }
  /*submit form*/
  const store = () => {

    if (!isEmpty(mainState) && !isEmpty(variant)) {

      update({...mainState,'variant':variant},edit).then(data => {
        NotificationManager.primary(
            'Product Updated',
            'Notification',
            3000,
            null,
            null,
            'primary'
        );
      })
      .catch(err => console.log(err))
    }else{
        NotificationManager.error(
          'All fields are required',
          'Notification',
          3000,
          null,
          null,
          'error'
        ); 
    }

  }

  return (
    <React.Fragment>
    <Card className="mb-5">
      <CardBody>
        <h6 className="mb-4">Edit Product</h6>
        <AvForm className="av-tooltip mb-5" onSubmit={() => store()}>
        <Row>
            <Colxx xs="6">
              <AvGroup className="error-l-100 tooltip-label-right">
              <AvField
                type="select"
                name="category_id"
                required
                label="Category"
                errorMessage="Please select an option!"
                value={getEdit.category_id}
                onChange={(event) => {
                    setMainState({ ...mainState, 
                      category_id: event.target.value
                    })
                  }
                }
              >
                <option value="">Select Category</option>
                {getCategory.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  )
                })}
              </AvField>
              </AvGroup>
            </Colxx>
            <Colxx xs="6">
              <AvGroup className="error-l-100 tooltip-label-right">
              <Label>Product Name</Label>
              <AvInput 
                name="product_name" 
                required 
                onChange={(event) => setMainState({ ...mainState, product_name: event.target.value })}
                value={getEdit.name}
                />
              <AvFeedback>Required Field</AvFeedback>
              </AvGroup>
            </Colxx>
        </Row>
        <Row>
          <Colxx xs="3">
            <AvGroup className="error-l-100 tooltip-label-right">
              <AvField
                type="select"
                name="product_attribute_id"
                label="Product Attribute"
                errorMessage="Please select an option!"
                value={state.product_attribute_id}
                onChange={(event) => {
                    setState({ ...state, 
                      product_attribute_id: event.target.value,
                      product_attribute:event.target.options[event.target.selectedIndex].text 
                    })
                  }
                }
              >
                <option value="">Select Product Attribute</option>
                {getProductAttribute.map((attribute) => {
                  return (
                    <option key={attribute.id} value={attribute.id}>{attribute.name}</option>
                  )
                })}
              </AvField>
            </AvGroup>
          </Colxx>
          <Colxx xs="3">
              <AvGroup className="error-l-100 tooltip-label-right">
                <Label>Name</Label>
                <AvInput 
                name="name" value={state.name} onChange={(event) => setState({ ...state, name: event.target.value })}/>
                <AvFeedback>Required Field</AvFeedback>
              </AvGroup>
          </Colxx>
          <Colxx xs="2">
              <AvGroup className="error-l-100 tooltip-label-right">
                <Label>SKU</Label>
                <AvInput 
                name="sku" 
                value={state.sku}
                onChange={(event) => setState({ ...state, sku: event.target.value })}/>
                <AvFeedback>Required Field</AvFeedback>
              </AvGroup>
          </Colxx>
          <Colxx xs="2">
              <AvGroup className="error-l-100 tooltip-label-right">
              <Label>Price</Label>
                <AvInput 
                name="price" 
                value={state.price}
                onChange={(event) => setState({ ...state, price: event.target.value })}/>
                <AvFeedback>Required Field</AvFeedback>
              </AvGroup>
          </Colxx>
          <Colxx xs="2">
              
              <Button 
              className={`glyph-icon iconsminds-add`} 
              style={{ marginTop:'12%'}} 
              color="primary" 
              onClick={() => addItem()}> Add More</Button>
          </Colxx>
        </Row>
        { variant.map((productVariant,key) => {

          return(
          <Row key={key}>
           <Colxx xs="3">
              <AvGroup className="error-l-100 tooltip-label-right">
                <Label>Product Attribute</Label>
                <AvInput name="productAttribute[]" value={productVariant.product_attribute} disabled/>
              </AvGroup>
          </Colxx>
          <Colxx xs="3">
              <AvGroup className="error-l-100 tooltip-label-right">
                <Label>Name</Label>
                <AvInput name="name[]" value={productVariant.name} disabled/>
              </AvGroup>
          </Colxx>
          <Colxx xs="2">
              <AvGroup className="error-l-100 tooltip-label-right">
                <Label>SKU</Label>
                <AvInput name="sku[]" value={productVariant.sku} disabled/>
              </AvGroup>
          </Colxx>
          <Colxx xs="2">
              <AvGroup className="error-l-100 tooltip-label-right">
              <Label>Price</Label>
                <AvInput name="price[]" value={productVariant.price} disabled/>
              </AvGroup>
          </Colxx>
          <Colxx xs="2">
              <Button 
              className={`glyph-icon iconsminds-close`} 
              style={{ marginTop:'12%'}} 
              color="danger" 
              onClick={() => removeItem(productVariant)}
              > Remove</Button>
          </Colxx>
        </Row>
           );
        })}

          <Button color="primary" >Update</Button>
        </AvForm>
        
      </CardBody>
    </Card>
  </React.Fragment>
  );
};

export default FormEdit;
