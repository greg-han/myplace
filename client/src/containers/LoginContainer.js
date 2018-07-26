import { logOn } from '../actions/actions';
import { logOff } from '../actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../components/Login';


const mapStateToProps = (state) => {
   return {
     loggedIn : state.logReducers
   }
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ logOn, logOff },dispatch)
  }
}

const LoginContainer= connect(mapStateToProps,mapDispatchToProps)(Login)

export default LoginContainer;
