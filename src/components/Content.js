import React from 'react';
import UserInteractions from './UserInteractions.js';

class Content extends React.Component {

    render() {
        return (
            <div id="layoutSidenav_content" >
                <main>
                    <div className="container-fluid">
                        <div className="container-fluid">
                            <UserInteractions />
                        </div>
                    </div>
                </main>
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website 2019</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                        <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Content;