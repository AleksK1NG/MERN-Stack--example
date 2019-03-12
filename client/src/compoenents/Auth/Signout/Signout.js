import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../ducks/auth';

import { NavLink } from 'reactstrap';

const Signout = (props) => {
  return (
    <React.Fragment>
      <NavLink onClick={props.logout} href="#">
        Logout
      </NavLink>
    </React.Fragment>
  );
};

export default connect(
  null,
  { logout }
)(Signout);
