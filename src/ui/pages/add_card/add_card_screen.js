import React, { Component } from 'react';
import Exponent from 'exponent';

import ContainerComponent from '../../../container_component';

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------


// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
import {
    AppRegistry,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Dimensions,
    TextInput,
    Image
} from 'react-native';

const SWIPER_HEIGHT = 500;
import CreditCard, {CardImages} from 'react-native-credit-card';

import Swiper from 'react-native-swiper';
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: width,
        height: height
    },
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1,
        paddingTop: 30
    },
    wrapper: {
        height: SWIPER_HEIGHT,
    },
    slide: {
        height: SWIPER_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {

    },
    textInput: {
      height: 40
    },
    card: {
        marginHorizontal: 10,
        marginBottom: 30,
        backgroundColor: '#fff',
        borderRadius: 3,
        elevation: 3,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ddd',
        padding: 10,
    },
    button: {
        height: 40,
        backgroundColor: '#1ba549',
        justifyContent: 'center',
    },
    textButton: {
        textAlign: 'center',
        color: '#fff'
    }

});

export default class RNCreditCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: 'name',
            number: '',
            name: '',
            cvc: '',
            expiry: '',
            index: 0,
            type: 'visa'
        }
    }

    onNext() {
        this.swiper.scrollBy(1);
    }

    componentDidMount() {
        this.refs['number'].focus();
    }

    componentWillMount() {
        /* cacheImages([
            require('../../assets/images/card-front.png'),
            require('../../assets/images/card-back.png'),
        ]); */
    }

    onMomentumScrollEnd(e, state, context) {
        var indexMap = [
            'number',
            'name',
            'expiry',
            'cvc',
            'type',
        ];
        this.setState({
            index: state.index,
            focused: indexMap[state.index]
        }, () => {
            try {
                this.refs[indexMap[state.index]].focus();
            } catch(e) {

            }
        });
    }

    render() {
        var cardTypes = [];
        for (var key in CardImages) {
            cardTypes.push({type: key, image: CardImages[key]});
        }
        if (this.state.restoring) {
            return null;
        }
        return (
            <View style={styles.container}>
                <Image style={styles.background} source={require('../../assets/images/background.png')} resizeMode={'cover'} />
                <CreditCard
                    style={{marginVertical: 10, marginHorizontal: 10, marginBottom: 0, elevation: 3, alignSelf: 'center'}}
                    imageFront={require('../../assets/images/card-front.png')}
                    imageBack={require('../../assets/images/card-back.png')}
                    shiny={false}
                    bar={false}
                    focused={this.state.focused}
                    number={this.state.number}
                    name={this.state.name}
                    expiry={this.state.expiry}
                    cvc={this.state.cvc}/>

                <Swiper
                    style={styles.wrapper}
                    height={SWIPER_HEIGHT}
                    showsButtons={false}
                    onMomentumScrollEnd = {this.onMomentumScrollEnd.bind(this)}
                    ref={(swiper) => {this.swiper = swiper}}
                    index={this.state.index}>
                    <View style={styles.slide}>
                        <View style={styles.card}>
                            <Text style={styles.textNumber}>CARD NUMBER</Text>
                            <TextInput style={styles.textInput} ref="number" autoFocus={true} value={this.state.number} onChangeText={(number) => this.setState({number})}/>
                        </View>
                    </View>
                    <View style={styles.slide}>
                        <View style={styles.card}>
                            <Text style={styles.textName}>CARD HOLDER'S NAME</Text>
                            <TextInput style={styles.textInput} ref="name" value={this.state.name} onChangeText={(name) => this.setState({name})}/>
                        </View>
                    </View>
                    <View style={styles.slide}>
                        <View style={styles.card}>
                            <Text style={styles.textName}>EXPIRY</Text>
                            <TextInput style={styles.textInput} ref="expiry" value={this.state.expiry} onChangeText={(expiry) => this.setState({expiry})}/>
                        </View>
                    </View>
                    <View style={styles.slide}>
                        <View style={styles.card}>
                            <Text style={styles.textCvc}>CVV/CVC NUMBER</Text>
                            <TextInput style={styles.textInput} ref="cvc" value={this.state.cvc} onChangeText={(cvc) => this.setState({cvc})}/>
                        </View>
                    </View>
                    <View style={styles.slide}>
                        <View style={styles.card}>
                            <Text style={styles.textNumber}>CARD TYPE</Text>
                            <View style={{flexDirection: 'row'}}>
                                {cardTypes.map((cardType) => {
                                    return (
                                        <TouchableOpacity key={cardType.type} onPress={() => this.setState({type: cardType.type})}>
                                            <View>
                                                <Image source={{uri: cardType.image}} style={{width: 57, height: 35, marginHorizontal: 5}} />
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                    </View>
                </Swiper>
                <TouchableOpacity onPress={this.onNext.bind(this)}>
                    <View style={styles.button}>
                        <Text style={styles.textButton}>NEXT</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

function cacheImages(images) {
    return images.map(image => Exponent.Asset.fromModule(image).downloadAsync());
}

//export default AddCardScreen;

/* class AddCardScreen extends ContainerComponent {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // ----------------------------------------------------------------------

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  componentDidMount() {
  }

  render() {
    return (
     <CreditCard
         type={this.state.type}
         imageFront={require('../../assets/images/card-front.png')}
         imageBack={require('../../assets/images/card-back.png')}
         shiny={false}
         bar={false}
         focused={this.state.focused}
         number={this.state.number}
         name={this.state.name}
         expiry={this.state.expiry}
         cvc={this.state.cvc}/>
    );
  } // <= render

  // ----------------------------------------------------------------------
  // ----------------------------------------------------------------------
  // ----------------------------------------------------------------------


}

export default AddCardScreen;
 */