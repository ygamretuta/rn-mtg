import React, { Component } from 'react';

import {
    StyleSheet,
    Image,
    View
} from 'react-native';

import { 
    Container, 
    Header,
    Content,
    H1, 
    Card, 
    CardItem, 
    Text,
    Spinner,
    Title,
    Icon
} from 'native-base';

export default class CardDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            result:{
                card: {}
            }
        }
    }

    componentDidMount(){
        var that = this;
        this.getCard();
    }

    getCard(){
        this.setState({
            loading: true
        });

        var that = this;

        return fetch('https://api.magicthegathering.io/v1/cards/' + this.props.id)
            .then((response) => response.json())
            .then((responseJson) => {
                that.setState({
                    result: responseJson,
                    loading: false
                });

                return responseJson.card
            })
            .catch((error) => {
                that.setState({
                    loading: false
                });
                
                console.error(error);
            });
    }

    render() {
        var card = this.state.result.card;

        return (
            <Container>
                    {this.state.loading? <Content /> :
                        <Content style={styles.paddedTop}> 
                            <H1 style={{textAlign: 'center'}}>{card.name}</H1>
                            <Text style={styles.ruleText}>{card.text}</Text>
                            <View style={styles.imageCont}>
                                <Image
                                    style={styles.cardImage}
                                    source={require('./cardback.jpg')}
                                />
                            </View>
                        </Content>
                    }
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    paddedTop: {
        marginTop: 65,
        marginLeft: 5,
        marginRight: 5
    },
    imageCont:{
        flex: 1,
        alignItems: 'center'
    },
    ruleText: {
        color:'#333333', 
        fontSize: 12,
        marginLeft: 20,
        marginRight: 20
    },
    cardImage:{
        marginTop: 10
    }
    
})