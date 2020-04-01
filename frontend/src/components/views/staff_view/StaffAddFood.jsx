import React, { Component } from 'react';
import {
  Button, Form, Grid, Header, Item, Icon,
} from 'semantic-ui-react';
import Axios from 'axios';
import config from '../../../config.json';
import userContext from '../../../userContext';


class StaffAddFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      food_name: '',
      daily_limit: 10000000,
      availability: true,
      price: '',
      restaurant_id: '',
      menu: [],
    };

    this.loadMenu = async () => {
      const { restaurant_id } = this.context.user;
      this.state.restaurant_id = restaurant_id;
      try {
        // const result = await Axios.get(
        // `${config.localhost}restaurants/${restaurant_id}`);
        // console.log(result);
        const result = await Axios.get(
          `${config.localhost}restaurants/${restaurant_id}/food`,
        );
        console.log(result);
        if (result.status === 200) {
          this.setState({ menu: result.data });
        } else {
          alert('unable to load menu');
        }
      } catch (error) {
        console.log('Error has occured');
      }
    };

    this.createItem = async () => {
      const { user } = this.context;
      try {
        const { restaurant_id } = user;
        this.state.restaurant_id = restaurant_id;
        const result = await Axios.post(
          `${config.localhost}food/create`,
          this.state,
          {
            headers: { 'Access-Control-Allow-Origin': true },
          },
        );
        this.clearForm();
        alert('item created!');
        this.loadMenu();
      } catch (error) {
        console.log(error);
        alert('error has occured');
      }
    };

    this.clearForm = () => {
      this.setState({
        category: '',
        food_name: '',
        daily_limit: 10000000,
        availability: true,
        price: '',
        restaurant_id: '',
      });
    };

    this.handleChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      this.setState({
        [name]: value,
      });
    };
  }

  /* executed once components are mounted */
  componentDidMount() {
    this.loadMenu();
  }

  render() {
    const { menu, price, food_name, daily_limit, category } = this.state;
    const { user } = this.context;
    console.log(user.restaurant_id);
    return (
      <Grid columns={2} stackable>
        <Grid.Column>
          <Form>
            <Form.Field>
              <Header>Food Name</Header>
              <input
                fluid
                placeholder="Food Name"
                name="food_name"
                value={food_name}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Header>Daily Quantity</Header>
              <input
                placeholder="Daily Quantity"
                name="daily_limit"
                value={daily_limit}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Header>Price</Header>
              <input
                placeholder="Price"
                name="price"
                value={price}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Header>Category</Header>
              <input
                placeholder="Category"
                name="category"
                value={category}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Button
              type="submit"
              onClick={this.createItem}
            >
              Submit
            </Button>
          </Form>
        </Grid.Column>
        <Grid.Column>
          <Header as="h1">Menu Items</Header>
          <Item.Group divided style={{ textAlign: 'left' }}>
            {menu.map((food) => (
              <Item key={food.food_id}>
                <Item.Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
                <Item.Content>
                  <Item.Header as="h1">{food.food_name}</Item.Header>
                  <Item.Description floated="left">
                    Price:
                    <b>{` ${food.price}`}</b>
                    {' '}
                    <br />
                    Daily Limit:
                    {' '}
                    <b>{` ${food.daily_limit}`}</b>
                    {' '}
                    <br />
                    Available:
                    <b>{food.availability ? <Icon name="checkmark" color="green" /> : <Icon name="cancel" color="red" />}</b>
                    {' '}
                  </Item.Description>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        </Grid.Column>
      </Grid>
    );
  }
}

StaffAddFood.contextType = userContext;
export default StaffAddFood;
