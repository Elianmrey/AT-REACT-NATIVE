import * as Progress from 'react-native-progress';


const ProgressBar = ({value}) => {
    return (
        <Progress.Bar progress={value} width={null} height={10} color="orange" />
    );
};

export default ProgressBar;