import React, { Component } from 'react';
import userContext from '../../../userContext';
import Calendar from 'react-calendar';
import { Dropdown, Grid, Button, Form, Header } from 'semantic-ui-react';

function getEarliestDate(dates) {
    return dates.reduce((prev, curr) => (curr < prev ? curr : prev));
}
  
function getLatestDate(dates) {
    return dates.reduce((prev, curr) => (curr > prev ? curr : prev));
}
  
function fixDateRange(dateRange) {
    return [getEarliestDate(dateRange), getLatestDate(dateRange)];
}

function generateValues(start, end) {
    const arr = [];
    for (let i = start; i <= end; i++) {
        arr.push({
            key:i,
            text:i+":00",
            value:i+":00"
        });
    }
    console.log(arr);
    return arr;
}

const timeOptions = generateValues(10, 22);


class PromotionDurationSegment extends Component {

    constructor() {
        super();
        this.state = {
            date: new Date(Date.now()),
            dateRange: [new Date(Date.now()), new Date(Date.now())],
            dateBuffer: [],
            waitingForFirstClick: true,
            startTime: "",
            endTime: "",
            promoName: "",
            discount: "",
            restaurantId: "",
        };

        this.handleChange = (event) => {
            event.preventDefault();
            const { name, value } = event.target;
            console.log(name);
            console.log(value);
            this.setState({
              [name]: value,
            });
            console.log(this.state);
          };
        
        this.handleStartTimeChange = (event, {value}) => {
            this.setState({ startTime: value });
        };

        this.handleEndTimeChange = (event, {value}) => {
            this.setState({ endTime: value });
        };

        this.handleSubmit = async () => {
            const { restaurant_id } = this.context.user;
            this.state.restaurantId = restaurant_id;
            console.log(this.state);
            // how to concantenate date and time together??
        }
    }


    render() {
        const {
            dateRange, waitingForFirstClick, dateBuffer, startTime, endTime, promoName, discount
        } = this.state;
        return (
            <>
            <Header size="huge">Create a promotion</Header>
            <br />
            <Form>
                <Form.Field>
                <Header>Enter Date</Header>
                <Calendar
                className="calendar"
                onClickDay={(value) => {
                this.setState({
                    date: value,
                });
                if (waitingForFirstClick) {
                    this.setState({
                    waitingForFirstClick: false,
                    dateBuffer: [value],
                    });
                } else {
                    this.setState({
                    waitingForFirstClick: true,
                    dateRange: fixDateRange(dateBuffer.concat([value])),
                    dateBuffer: [],
                    });
                }
                }}
                value={dateRange}
                />
                </Form.Field>
                <br />
                <Form.Field>
                <Header>
                    Enter Time Period
                </Header>
                <Grid>
                <Grid.Row columns={3}>
                    <Grid.Column>
                    <Dropdown
                            placeholder='Select Start Time'
                            fluid
                            selection
                            options={timeOptions}
                            name="startTime"
                            value={startTime}
                            onChange={this.handleStartTimeChange}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <p>to</p>
                    </Grid.Column>
                    <Grid.Column>
                    <Dropdown
                            placeholder='Select End Time'
                            fluid
                            selection
                            options={timeOptions}
                            name="endTime"
                            value={endTime}
                            onChange={this.handleEndTimeChange}
                        />
                    </Grid.Column>
                </Grid.Row>
                </Grid>
                </Form.Field>
                <Form.Field>
                <Header>Promotion Name</Header>
                <input
                    placeholder="Promotion Name"
                    name="promoName"
                    value={promoName}
                    onChange={this.handleChange}
                />
                </Form.Field>
                <Form.Field>
                <Header>Discount Amount</Header>
                <input
                    placeholder="Discount"
                    name="discount"
                    value={discount}
                    onChange={this.handleChange}
                />
                </Form.Field>
                <Button
                type="submit"
                onClick={this.handleSubmit}
                >
                Submit
                </Button>
            </Form>
            </>
        ); 
    }

}

PromotionDurationSegment.contextType = userContext;
export default PromotionDurationSegment;