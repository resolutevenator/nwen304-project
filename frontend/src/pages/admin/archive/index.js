import React, {Component} from 'react';

import {getAllEmails, archive} from '../../../redux/actions/remote';

import {FaSearch as SearchIcon, FaArchive as ArchiveIcon} from "react-icons/fa";

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';


class AdminArchiveOrders extends Component {
  state = {
    search: '',
    allEmails: []
  }

  componentDidMount() {
    getAllEmails(this.props.token)
      .then(x => x.map(x => x.email))
      .then(allEmails => this.setState({allEmails}));
  }

  render() {
    const {search, allEmails} = this.state;
    const matches = allEmails.filter(e => e.includes(search));
    return <>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text><SearchIcon /></InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control type='text' value={search} onChange={({target}) => this.setState({search: target.value})} />
      </InputGroup>
      <br />
      <ListGroup>
        {matches.map(x => <ListGroup.Item key={x}>
          <Row>
            <Col>
              {x}
            </Col>
            <Col>
              <Button variant='danger'
                onClick={() => archive(this.props.token, x)
                  .then(()=>alert('Done!'))}>
                <ArchiveIcon /> Archive
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>)}
      </ListGroup>
    </>;
  }
}

export default AdminArchiveOrders;
