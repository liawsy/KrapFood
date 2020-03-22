import React, { Component } from 'react';
import {
  List, Item, Card, Button, Modal, Header, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import customerCartContext from './customerCartContext';

class RestaurantCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { res } = this.props;

    const { addToCart } = this.context;
    return (
      <List.Item key={res.restaurant_id}>
        <List.Content>
          <List.Header as="h2">
            {`${res.restaurant_name}`}
          </List.Header>
          <List.Description>
            {`Location ${res.restaurant_location}`}
          </List.Description>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Card style={{ margin: 'auto' }}>
              <Card.Header>
                Menu
              </Card.Header>
              <Card.Content>
                <Item.Group divided>
                  {res.foods.map((food) => (
                    <Item>
                      <Item.Content verticalAlign="middle">
                        <Item.Header as="a">
                          {' '}
                          {`food name: ${food.food_name}`}
                        </Item.Header>
                        <Item.Meta>Description</Item.Meta>
                        <Item.Extra>{`Price: ${food.price}`}</Item.Extra>
                      </Item.Content>
                    </Item>
                  ))}
                </Item.Group>
              </Card.Content>
              <Card.Content extra>
                <Modal trigger={<Button color="green">Order</Button>}>
                  <Modal.Header>{`${res.restaurant_name}`}</Modal.Header>
                  <Modal.Header>{`Located at: ${res.restaurant_location}`}</Modal.Header>
                  <Modal.Content s>
                    <Modal.Description>
                      <Header>Available Menu</Header>
                      <Item.Group divided>
                        {res.foods.map((food) => (
                          <Item>
                            <Item.Content verticalAlign="middle">
                              <Item.Header as="a">
                                {' '}
                                {`food name: ${food.food_name}`}
                              </Item.Header>
                              <Item.Meta>Description</Item.Meta>
                              <Item.Extra>
                                {`Price: ${food.price}`}
                                <Button primary floated="right" onClick={() => addToCart(food)}>
                                  Add to cart
                                  <Icon name="right chevron" />
                                </Button>
                              </Item.Extra>

                            </Item.Content>
                          </Item>
                        ))}
                      </Item.Group>
                    </Modal.Description>
                  </Modal.Content>
                </Modal>
              </Card.Content>
            </Card>

          </div>
        </List.Content>
      </List.Item>
    );
  }
}

RestaurantCard.contextType = customerCartContext;
RestaurantCard.propTypes = {
  res: PropTypes.object,
};

export default RestaurantCard;