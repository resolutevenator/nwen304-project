import React, {Component} from 'react';
import ItemView from '../../components/item_list';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SpinnerRB from 'react-bootstrap/Spinner';

import {FaSearch as SearchIcon} from "react-icons/fa";

class SearchPage extends Component {

  state = {
    loading: false,
    result_id: [],
    search_param: ''
  }

  changeSearchParam = ({target}) => this.setState({search_param: target.value});

  search = () => console.log(this.state.search_param);

  render() {
    let {search_param, loading, result_id} = this.state;
    return <Container>
        <h1> Search </h1>
        <InputGroup>
          <Form.Control type='text' value={search_param} onChange={this.changeSearchParam}/>
          <InputGroup.Append>
            <Button variant='outline-primary' onClick={this.search}>
              <SearchIcon />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      <ItemView items={result_id} />

      <div
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '1.5em'
        }}
      >
          {loading ? <Spinner /> : ''}
      </div>
    </Container>
  }
};

function Spinner() {
  return <SpinnerRB animation='border' variant='info' style={{width: '10rm', height: '10rm'}} />
}

export default SearchPage;
