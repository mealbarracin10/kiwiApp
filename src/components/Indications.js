import React, { Component } from 'react';
import {Title, Button, Left, Container, Header, Content, Card, CardItem, Text, Icon, Right, List, ListItem, Body } from 'native-base';


export default class Indications extends Component {
  render() {
    const {goBack} = this.props.navigation;
    const { params } = this.props.navigation.state;
    const instructions = params ? params.instructions : null;
    const distance = params ? params.distance : null;
    const duration = params ? params.duration : null;    
    return (
      <Container>
        <Header>
        <Left>
          <Button transparent onPress={() => goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Indications</Title>
        </Body>
        <Right />
      </Header>
        <Content>
          <Card>
            <CardItem>
              <Icon active name="ios-time" />
               <Text>Duration: {JSON.stringify(duration)}</Text>
             </CardItem>
             <CardItem>
              <Icon active name="ios-navigate" />
               <Text>Distance: {JSON.stringify(distance)}</Text>
             </CardItem>

            <List dataArray={instructions}
              renderRow={(data) =>
                <ListItem >
                  <Body>
                    <Text>{data}</Text>
                  </Body>
                </ListItem>
              }>
            </List>

           </Card>
        </Content>
      </Container>
    );
  }
}