import React from 'react';

export default class Select extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.props.onChange;
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <select className="form-control" id={"select-" + this.props.id} onChange={this.onChange}>
                    {this.props.options.map(el => { return <option key={el.key} value={el.key}>{el.value}</option> })}
                </select>
            </div>
        )
    }

}
