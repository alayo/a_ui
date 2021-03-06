import React from 'react';
import {withStyles, AppBar, Typography, Avatar, Hidden} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {FuseNavigation, FuseLayouts} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';

const styles = theme => ({
    root  : {
        '& .user': {
            '& .username, & .email': {
                transition: theme.transitions.create('opacity', {
                    duration: theme.transitions.duration.shortest,
                    easing  : theme.transitions.easing.easeInOut
                })
            }
        }
    },
    avatar: {
        width     : 72,
        height    : 72,
        position  : 'absolute',
        top       : 50,
        padding   : 8,
        background: theme.palette.background.default,
        boxSizing : 'content-box',
        left      : '50%',
        transform : 'translateX(-50%)',
        '& > img' : {
            borderRadius: '50%'
        }
    }
});


function MainNavbar({classes, navigation, layoutStyle, user})
{
    function UserHeader()
    {
        return (
          <div>
          </div>
        );
    }

    const navigationLayout = FuseLayouts[layoutStyle].type;
    return (
        <div className={classes.root}>
            {navigationLayout === 'vertical' ? (
                <React.Fragment>
                    <UserHeader/>
                    <FuseNavigation navigation={navigation} layout={navigationLayout}/>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Hidden lgUp>
                        <UserHeader/>
                    </Hidden>
                    <FuseNavigation navigation={navigation} layout={navigationLayout}/>
                </React.Fragment>
            )}

        </div>
    );
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({fuse, auth})
{
    return {
        navigation : fuse.navigation,
        layoutStyle: fuse.settings.current.layout.style,
        user       : auth.user
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(MainNavbar)));
