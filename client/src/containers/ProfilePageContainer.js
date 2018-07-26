import { logOn } from '../actions/actions';
import { logOff } from '../actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProfilePage from '../components/ProfilePage';


const mapStateToProps = (state) => {
   return {
     loggedIn : state.logReducer
   }
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ logOn, logOff },dispatch)
  }
}

const ProfilePageContainer = connect(mapStateToProps,mapDispatchToProps)(ProfilePage)

export default ProfilePageContainer 
