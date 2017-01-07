import React, { Component } from 'react';

import {
    StyleSheet
} from 'react-native';

import { 
    Container, 
    Content, 
    List, 
    ListItem, 
    Text, 
    Icon, 
    Badge,
    Spinner 
} from 'native-base';

import { Actions } from 'react-native-router-flux';

export default class CardList extends Component {
    constructor(props){
        super(props);
        this.state = {
            results: {
                cards: []
            }
        }
    }

    componentDidMount(){
        var that = this;
        this.getCards();
    }
     
    getCards(){
        this.setState({
            loading: true
        });

        var that = this;

        return fetch('https://api.magicthegathering.io/v1/cards?supertypes=legendary&types=creature&pageSize=20')
            .then((response) => response.json())
            .then((responseJson) => {
                that.setState({
                    results: responseJson,
                    loading: false
                });

                return responseJson.cards
            })
            .catch((error) =>{
                that.setState({
                    loading: false
                });

                console.error(error);
            });
    }

    render() {
        return (
             <Container>
                <Content>
                    {this.state.loading? <Spinner /> : <List style={styles.paddedTop} dataArray={this.state.results.cards} renderRow={(card) =>
                        <ListItem iconRight onPress={() => Actions.card_detail({id:card.id})}>
                            <Text>{card.name}</Text>
                            <Icon name="ios-arrow-forward" style={{ color: '#0A69FE' }} />
                        </ListItem>
                    }/>}
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    paddedTop: {
        marginTop: 60
    }
})