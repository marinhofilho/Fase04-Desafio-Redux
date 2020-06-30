import React from 'react';
import { FlatList } from 'react-native';

import api from '../../services/api';

import { Container, Product, ProductImage, ProductPrice } from './styles';

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
      .catch((err) => console.tron.log(`${err} this is it`));

    console.log(response);
    const data = response.data.map((product) => ({
      ...product,
    }));

    this.setState({ products: data });
  };

  renderProduct = ({ item }) => {
    return (
      <Product key={item.id}>
        <ProductImage source={{ uri: item.image }} />
        <ProductPrice>{item.price}</ProductPrice>
      </Product>
    );
  };

  render() {
    const { products } = this.state;
    return (
      <Container>
        <FlatList
          horizontal
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={this.renderProduct}
        />
      </Container>
    );
  }
}

export default Home;
