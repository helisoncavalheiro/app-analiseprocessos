import React from 'react';

class Loader extends React.Component {

    render() {
        return (
            <div className="spinner-grow" style={{width: '3rem', height: '3rem'}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    }

}

export default Loader;