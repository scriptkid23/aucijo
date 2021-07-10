import React, { Component } from 'react'
import { DrizzleContext } from '../context/drizzle.context';

const WrapperDrizzleComponent = (OriginalComponent ) => {
    class WrapperDrizzleComponent extends Component {
        static contextType = DrizzleContext;
        constructor(props){
            super(props);
            this.state = {
                methods: null,
                context: null,
            }
        }
        componentDidMount(){
            console.log("wrapper drizzle render")
            const context = this.context;
            this.setState({
                methods: context.contracts.Aucijo.methods,
                context: context,
            })
        }
        render(){
            return(
                <OriginalComponent
                    methods = {this.context.contracts.Aucijo.methods}
                    context = {this.context}
                    owner = {localStorage.getItem('address')}
                    {...this.props}
                />
            )
        }
    }
    return WrapperDrizzleComponent;
}
export default WrapperDrizzleComponent;