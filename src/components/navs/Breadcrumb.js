import React from 'react';

class Breacrumb extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-4">
                    {this.props.children}
                </ol>
            </nav>
        )
    }
}
export default Breacrumb;