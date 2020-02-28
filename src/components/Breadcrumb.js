import React from 'react';

class Breacrumb extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">{this.props.title}</li>
            </ol>
        )
    }
}
export default Breacrumb;