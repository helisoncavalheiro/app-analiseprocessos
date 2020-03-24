import React from 'react';

class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
/*
    componentDidMount() {
        if (this.props.searchedId !== "") {
            this.setState({ value: this.props.searchedId })
        }
    }
*/
    handleChange(newValue) {
        this.setState({ value: newValue })
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor="matricula">{this.props.label}</label>
                <input type={this.props.type} value={this.state.value} id={this.props.id} onChange={(evt)=>{this.handleChange(evt.target.value)}} className="form-control" aria-describedby="" />
            </div>
        )
    }

}

export default Input;