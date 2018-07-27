import { logOn } from '../actions/actions';
import { logOff } from '../actions/actions';
import { loadUser } from '../actions/actions';
import { dropUser } from '../actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';


const mapStateToProps = (state) => {
   return {
     loggedIn : state.logReducers.loggedIn,
     username : state.userReducer.username
   }
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ logOn, logOff,loadUser,dropUser },dispatch)
  }
}

const NavBarContainer = connect(mapStateToProps,mapDispatchToProps)(Navbar)

export default NavBarContainer
