import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatPrice } from '../../util/format';

import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import {
  Container,
  Product,
  ProductImage,
  ProductDescription,
  ProductPrice,
  AddButton,
  ProductAmountText,
  AddButtonText,
  ProductAmount,
} from './styles';

class Home extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = async () => {
    const response = await api
      .get('/products')
      .catch((err) =>
        console.tron.log(`${err} - There is an error in the api call`)
      );

    const data = response.data.map((product) => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  };

  handleAddProduct = (id) => {
    // every component that works with redux receives a dispatch
    // dispatch shoots actions
    // const { dispatch } = this.props;

    const { addToCartRequest } = this.props;
    // it became a property via mapDispatchToProps

    addToCartRequest(id);
  };

  renderProduct = ({ item }) => {
    const { amount } = this.props;
    return (
      <Product key={item.id}>
        <ProductImage source={{ uri: item.image }} />
        <ProductDescription>{item.title}</ProductDescription>
        <ProductPrice>{item.priceFormatted}</ProductPrice>
        <AddButton onPress={() => this.handleAddProduct(item.id)}>
          <ProductAmount>
            <Icon name="add-shopping-cart" color="#FFF" size={20} />
            <ProductAmountText>{amount[item.id] || 0}</ProductAmountText>
          </ProductAmount>
          <AddButtonText>ADICIONAR</AddButtonText>
        </AddButton>
      </Product>
    );
  };

  render() {
    const { products } = this.state;
    return (
      <Container>
        <FlatList
          data={products}
          extraData={this.props}
          keyExtractor={(item) => String(item.id)}
          renderItem={this.renderProduct}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
