import { logOn } from '../actions/actions';
import { logOff } from '../actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';


const mapStateToProps = (state) => {
   return {
     loggedIn : state.loggedIn
   }
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ logOn, logOff },dispatch)
  }
}

const NavBarContainer = connect(mapStateToProps,mapDispatchToProps)(Navbar)

export default NavBarContainer
