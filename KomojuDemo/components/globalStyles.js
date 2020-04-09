import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#e9572b',
    paddingVertical: '5%',
    paddingHorizontal: '3%',
    borderRadius: 5,
  },
  emoji: {
    fontSize: 70,
  },
  text: {
    fontSize: 20,
    marginVertical: '7%',
    marginHorizontal: '5%',
  },
});

export default styles;
