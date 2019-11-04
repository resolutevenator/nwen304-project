import React from 'react';
import {connect} from 'react-redux';

import {Link, withRouter} from 'react-router-dom';

import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import { FaShoppingCart as ShoppingCart} from 'react-icons/fa';

const {Brand} = NavBar;
const {Item} = Nav;

function nav(props) {

  return <NavBar bg='dark' variant='dark'>
    <Link to='/'><Brand>Shit Book Shop</Brand></Link>
    <Nav className='mr-auto'>
        {NavLink('Home', '/')}
        {props.user.authtoken ? NavLink('Profile', '/profile') : NavLink('Login', '/login')}
        {NavLink('Catalog', '/catalog')}
    </Nav>
    <Nav>
      <Link to='/search'>
        {NavLink('Search', '/search')}
      </Link>
      <Link to='/cart'>
        <Button variant='primary'>
          <ShoppingCart /> <Badge variant='light'>
            {Object.keys(props.items).length}
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

export default connect(({cart, user}) => ({...cart, user}))(withRouter(nav));
