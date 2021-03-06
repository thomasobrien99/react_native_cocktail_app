import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ListView,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import IngredientRow from '../components/IngredientRow'
import toTitleCase from '../services/helpers'
import appStyles from '../styles/styles'
import colors from '../styles/colors'

const martini_glass = require('../styles/img/martini_glass.png');
const hurricane_glass = require('../styles/img/hurricane_glass.png');
const shot_glass = require('../styles/img/shot_glass.png');
const highball_glass = require('../styles/img/highball_glass.png');
const default_glass = require('../styles/img/default_glass.png');
const coffee_glass = require('../styles/img/coffee_glass.png');
const pitcher_glass = require('../styles/img/pitcher_glass.png');
const wine_glass = require('../styles/img/wine_glass.png');
const champagne_glass = require('../styles/img/champagne_glass.png');


class CocktailShowScreen extends Component {
  constructor(props) {
    super(props)
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    this.state = {
      cocktail : {ingredients:[]},
      cocktailGlassImg : martini_glass,
      ingredientDataSource: ds.cloneWithRows({})
    }
  }
  componentDidMount (){
    fetch(`http://localhost:3000/api/cocktails/${this.props.cocktail.id}`).then(function(res){
      return res.json()
    }).then(function(data){
      let cocktailGlassImg = data.glass.toLowerCase().replace(/[ ]/g,'_');
      switch(cocktailGlassImg){
        case 'martini_glass': cocktailGlassImg = martini_glass; break;
        case 'hurricane_glass': cocktailGlassImg = hurricane_glass; break;
        case 'highball_glass': cocktailGlassImg = highball_glass; break;
        case 'cocktail_glass': cocktailGlassImg = martini_glass; break;
        case 'shot_glass': cocktailGlassImg = shot_glass; break;
        case 'irish_coffee_cup': cocktailGlassImg = coffee_glass; break;
        case 'pitcher': cocktailGlassImg = pitcher_glass; break;
        case 'white_wine_glass': cocktailGlassImg = wine_glass; break;
        case 'champagne_flute': cocktailGlassImg = champagne_glass; break;
        default : cocktailGlassImg = default_glass; break;
      }
      this.setState({
        cocktail : data,
        cocktailGlassImg,
        ingredientDataSource: ds.cloneWithRows(data.ingredients)
      })   
    }.bind(this))
    .catch(function(err){
      console.log(err)
    });
  }
  render() {
    return (
    <ViewContainer>
      <StatusBarBackground/>
      <View style={appStyles.viewCenter}>
        <Image source={this.state.cocktailGlassImg} />
        <Text style={appStyles.header}>{toTitleCase(this.state.cocktail.name)}</Text>
      </View>
      <ScrollView style={styles.cocktailBody}>
        <View style={styles.glassBox}>
          <Text style={styles.glassText}>{toTitleCase(this.state.cocktail.glass)}</Text>
        </View>
          {this.state.cocktail.ingredients.map((ingredient, i)=>{
            if (ingredient.amount === '\n') ingredient.amount = ''
            return <IngredientRow 
                    ingredient={ingredient.ingredient} 
                    amount={ingredient.amount} 
                    key={i} 
                    onPress={()=>this.props.navigator.props.changeSelectedTab('ingredientsTab', {ident:'show', ingredient: ingredient.ingredient})}/>
          })}
          <View style={styles.recipeBox}>
            <Text style={styles.recipeText}>
              {this.state.cocktail.recipe}
            </Text>
          </View>
        <View style={appStyles.tabBarSpacer}/>
      </ScrollView>
    </ViewContainer>
    )
  }
}

const styles = StyleSheet.create({
  glassBox:{
    padding: 1,
    backgroundColor: colors.beige
  },
  glassText:{
    padding: 5,
    fontFamily: 'Aleo-Bold',
    color: colors.darkBlue,
    fontWeight: 'bold'
  },
  cocktailBody:{
    padding: 20
  },
  recipeBox:{
    borderWidth: 1,
    borderColor: '#ccccb3',
    backgroundColor: colors.gray,
    padding: 5
  },
  recipeText:{
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'Aleo-Bold'
  }
});

module.exports = CocktailShowScreen;