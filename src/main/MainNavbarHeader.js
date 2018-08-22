import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import {withRouter} from 'react-router-dom';
import classNames from 'classnames';
import {Typography} from '@material-ui/core';

const styles = theme => ({
    root      : {
        display                       : 'flex',
        alignItems                    : 'center',
        '': {
            transition: theme.transitions.create('opacity', {
                duration: theme.transitions.duration.shortest,
                easing  : theme.transitions.easing.easeInOut
            })
        }
    },
    logo      : {},
    logoIcon  : {
        width     : 24,
        height    : 24,
        transition: theme.transitions.create(['width', 'height'], {
            duration: theme.transitions.duration.shortest,
            easing  : theme.transitions.easing.easeInOut
        })
    }
});

function MainNavbarHeader({classes})
{
  console.log(classes);
    return (

        <div className={classes.root}>
            <div className={classNames(classes.logo, "flex items-center")}>

            </div>
        </div>
    );
};

export default withStyles(styles, {withTheme: true})(withRouter(MainNavbarHeader));
