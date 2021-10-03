import React from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../fbInstance';
const Navigation = ({ userObj }) => {
    return (
        <div>

            <Link to="/">Home</Link>
            <Link to="/profile">{authService.getAuth().currentUser.displayName || "My"}Profile</Link>
        </div>
    );
};

export default Navigation;