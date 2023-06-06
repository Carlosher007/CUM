import React from 'react';
import { Container, Row } from 'reactstrap';
import Helmet from '../../components/Landing/Helmet/Helmet';
import CommonSection from '../../components/Landing/UI/CommonSection';
import OfficesList from '../../components/Landing/UI/OfficesList';

const Offices = () => {
  return (
    <div className="bg-white">
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
    </div>
  );
};

export default Offices;