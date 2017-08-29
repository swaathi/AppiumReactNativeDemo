import {
  StyleSheet,
  Dimensions
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'center'
  }, 
  headerText: {
    fontSize: 30,
    alignSelf: 'center',
    paddingBottom: 20
  },
  errorBlock: {
    backgroundColor: 'rgba(170, 5, 5, 0.2)',
    padding: 10,
    marginVertical: 10,
    borderColor: 'rgb(170, 5, 5)',
    borderWidth: 1,
    borderRadius: 5,
  },
  errorText: {
    color: 'rgb(170, 5, 5)',
  },
  successBlock: {
    backgroundColor: 'rgba(44, 188, 0, 0.2)',
    padding: 10,
    marginVertical: 10,
    borderColor: 'rgb(44, 188, 0)',
    borderWidth: 1,
    borderRadius: 5,
  },
  successText: {
    color: 'rgb(44, 188, 0)',
  },
  formGroupBlock: {
    marginVertical: 10,
  },
  formLabel: {
    paddingVertical: 5,
  },
  formInput: {
    borderRadius: 5,
    borderWidth: 0.5,
    padding: 10
  },
  formSubmitButton: {
    flexGrow: 0,
    alignItems: 'center',
    backgroundColor: '#237eed',
    padding: 10,
    borderRadius: 5,
  },
  formSubmitText: {
    color: '#fff'
  },

});