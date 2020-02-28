import React from 'react';

class Card extends React.Component {

    constructor(props) {
        super(props)
        this.state = {};
        this.props = {
            color : 'primary',
            title : 'Título',
            body : 'Corpo do cartão'
        }
    }
    render() {
        let {color, title, body} = this.props;
        return (
            <div className={"card bg-" + color + " text-white mb-4"}>
                <div className="card-body">
                    <div className="card-title">{title}</div>
                    {body}
                </div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                    <a className="small text-white stretched-link" href="#">View Details</a>
                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                </div>
            </div>
        )
    }
}
export default Card;