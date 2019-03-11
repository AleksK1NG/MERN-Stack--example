import React from 'react';
import { connect } from 'react-redux';
import { setName, userSelector } from '../../ducks/auth';

const Navbar = (props) => {
  return (
    <div>
      <h2>Navbar test component</h2>
      <h4>{props.user}</h4>
      <input
        value={props.user}
        onChange={(e) => props.setName(e.target.value)}
        type="text"
      />
    </div>
  );
};

export default connect(
  (state) => ({
    user: userSelector(state)
  }),
  { setName }
)(Navbar);
