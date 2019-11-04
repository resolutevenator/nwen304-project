import React from 'react';

import Container from 'react-bootstrap/Container';

export default function errorPage({location}) {
  const url = location.pathname;
  return <Container>
    <h1> Page not found </h1>

    <p>Apologies <code>{url}</code> cannot be found</p>
  </Container>;
};
