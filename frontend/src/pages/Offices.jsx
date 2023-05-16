import React from 'react';
import { Container, Row } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import OfficesList from '../components/UI/OfficesList';

const Offices = () => {
  return (
    <Helmet title="Sucursales">
      <CommonSection title="Sucursales" />
      <section>
        <Container>
          <Row>
            <OfficesList />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Offices;
