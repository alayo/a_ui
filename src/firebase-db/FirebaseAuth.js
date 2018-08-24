import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as userActions from 'auth/store/actions';
import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import firebase from 'firebase/app';

class FirebaseAuth extends Component {
    componentDidMount()
    {
        const {setUserData, createUserSettings} = this.props;


      }

    render()
    {
        const {children} = this.props;

        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
            setUserData       : userActions.setUserData,
            createUserSettings: userActions.createUserSettings,
            showMessage       : Actions.showMessage,
            hideMessage       : Actions.hideMessage
        },
        dispatch);
}


function mapStateToProps({fuse, auth})
{
    return {
        user: auth.user
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FirebaseAuth);
