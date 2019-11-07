import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logout} from '../../redux/actions';

import {Link, withRouter} from 'react-router-dom';

import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import {FaShoppingCart as ShoppingCart} from 'react-icons/fa';

const {Brand} = NavBar;
const {Item} = Nav;

function nav(props) {
  let {items, logout, usertype} = props;
  items = items >= 10 ? '9+' : items;
  return <NavBar bg='dark' variant='dark'>
    <Link to='/'><Brand>Group 19 Shop</Brand></Link>
    <Nav className='mr-auto'>
      {NavLink('Home', '/')}
      {usertype !== null ? NavLink('Profile', '/profile') : NavLink('Login', '/login')}
      {NavLink('Catalog', '/catalog')}
      {NavLink('Categories', '/category')}
      {usertype === 'admin' ? NavLink('Admin Panel', '/admin') :''}
    </Nav>
    <Nav>
      {usertype !== null ? <Item>
        <Nav.Link onClick={logout}>
          Logout
        </Nav.Link>
      </Item>:''}
      <Link to='/search'>
        {NavLink('Search', '/search')}
      </Link>
      <Link to='/cart'>
        <Button variant='primary'>
          <ShoppingCart /> <Badge variant='light'>
            {items}
          </Badge>
        </Button>
      </Link>
    </Nav>
  </NavBar>;
}

function NavLink(text, url) {
  return <Item>
    <Nav.Link as={Link} to={url}>
      {text}
    </Nav.Link>
  </Item>;
}

const dispatchToProps = dispatch => bindActionCreators({logout}, dispatch);
const mapStateToProps = ({cart, user}) => {
  const items = Object.values(cart.items).reduce((a,b) => a+b, 0)
  let usertype = null;
  if (user.profile)
    usertype = user.profile.usertype
  return {items, usertype};
};
export default connect(mapStateToProps, dispatchToProps)(withRouter(nav));
