import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Form,
  Segment,
  Header,
  Button,
  Message,
  Image,
} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import Axios from 'axios';
import userContext from '../../../userContext';
import config from '../../../config.json';

const src1 = require('./milk.png');

class ManagerSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };

    this.handleChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      this.setState({
        [name]: value,
      });
    };

    this.redirectHome = () => {
      const { history } = this.props;
      history.push('/');
    };

    this.handleSubmit = (event) => {
      // TODO: pass user type e.g customer to here to submit to correct endpoint;
      event.preventDefault();
      console.table(this.state);
      // call sign up function
      const { signup } = this.context;
      signup();
    };

    this.handleSubmitMg = async (event) => {
      const { email, password } = this.state;
      const { login } = this.context;
      event.preventDefault();
      await Axios.post(
        `${config.localhost}registrations/manager/sign-up`,
        { email, password },
        {
          headers: { 'Access-Control-Allow-Origin': true },
        },
      );
      try {
        await login(email, password, 'manager');
        const { history } = this.props;
        history.push('/');
      } catch (error) {
        console.log(error);
        alert('error has occured');
      }
    };
  }

  componentDidMount() {
    // console.log(this.context.test);
  }

  render() {
    const { email, password } = this.state;
    return (
      <>
        <Grid
          container
          textAlign="center"
          style={{ height: '100vh' }}
          verticalAlign="middle"
        >
          <Grid.Column>
            <Header as="h1" to="/">
              <Image src={src1} />
              KrapFood
            </Header>
            <Header as="h2" color="teal" textAlign="center">
              Sign Up
            </Header>

            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
                <Button
                  color="teal"
                  size="large"
                  compact
                  onClick={this.handleSubmitMg}
                >
                  <Button.Content visible>Sign up!</Button.Content>
                </Button>
              </Segment>
            </Form>
            <Segment>
              <Message>
                <Message.Header>Already have an account?</Message.Header>
                <Message.Content>
                  <br />
                  <Button size="small" as={Link} color="red" to="/sign-up">
                    Back to Sign up
                  </Button>
                  <Button primary size="small" as={Link} to="/login">
                    Log in
                  </Button>
                </Message.Content>
              </Message>
            </Segment>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

ManagerSignup.contextType = userContext;

ManagerSignup.propTypes = {
  history: PropTypes.arrayOf(Object).isRequired,
};

export default withRouter(ManagerSignup);
