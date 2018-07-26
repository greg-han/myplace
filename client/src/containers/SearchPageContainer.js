import { logOn } from '../actions/actions';
import { logOff } from '../actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchPage from '../components/SearchPage';

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

const SearchPageContainer = connect(mapStateToProps,mapDispatchToProps)(SearchPage)

export default SearchPageContainer 
