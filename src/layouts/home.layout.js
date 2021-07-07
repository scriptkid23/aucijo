import React, { Component } from 'react'
import { getRoutes } from '../helper/utils'
import { HomeRoute } from '../router/router'

export default class HomeLayout extends Component {
    render() {
        return (
            <React.Fragment>
                {getRoutes(HomeRoute)}
            </React.Fragment>
        )
    }
}
