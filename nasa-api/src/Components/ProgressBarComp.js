import * as Progress from 'react-native-progress';
import { StyleSheet } from 'react-native';


const ProgressBar = ({progress}) => {
    return (
        <Progress.Bar progress={progress} width={null} style={styles.container} color="orange" />
    );
};

export default ProgressBar;
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        margin: 10,
       
        position: 'relative',
    },
  
});


