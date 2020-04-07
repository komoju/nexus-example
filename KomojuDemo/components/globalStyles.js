import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 48,
    textAlign: 'center',
  },
  explainerText: {
    margin: '7%',
    fontSize: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#e9572b',
    padding: '5% 0%',
    borderRadius: 5,
  },
});

export default styles;
