import React from 'react';
class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <ul>
                {this.props.children}
            </ul>
        )
    }
}
export default Menu