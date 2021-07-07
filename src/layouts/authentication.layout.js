import React, { Component } from 'react'
import { getRoutes } from '../helper/utils'
import { AuthenticationRoute } from '../router/router'

export default class AuthenticationLayout extends Component {
    render() {
        return (
            <React.Fragment>
                {getRoutes(AuthenticationRoute)}
            </React.Fragment>
        )
    }
}
