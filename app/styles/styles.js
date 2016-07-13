import {
	StyleSheet
} from 'react-native'

appStyles = StyleSheet.create({
	header:{
	fontFamily: 'Aleo-Bold',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#00648c',
    textAlign: 'center'
	},
	viewCenter:{
		alignItems: 'center'
	},
	wideRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 32,
    paddingRight: 32,
    borderWidth: 2,
    borderRadius: 10,
    margin: 2,
  },
  wideRowText:{
    fontSize: 17,
    fontFamily: 'Aleo-Bold'
  },
  narrowRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 6,
    paddingBottom: 6,
    margin: 2,
    paddingLeft: 4,
    paddingRight: 4
  },
  narrowRowText:{

  },
  tabBarSpacer:{
    height: 60
  }
})

module.exports = appStyles;