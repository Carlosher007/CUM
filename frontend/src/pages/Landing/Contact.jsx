import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';
import Helmet from '../../components/Landing/Helmet/Helmet';
import CommonSection from '../../components/Landing/UI/CommonSection';

import '../../styles/contact.css';

const socialLinks = [
{
url: '#',
icon: 'ri-facebook-line',
},
{
url: '#',
icon: 'ri-instagram-line',
},
{
url: '#',
icon: 'ri-linkedin-line',
},
{
url: '#',
icon: 'ri-twitter-line',
},
];

const Contact = () => {
  const sedePrincipal = {
    direccion: 'Calle 5 # 23 - 45',
    telefono: '3013666140',
    email: 'cum@gmail.com',
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
  };

  return (
    <div className="bg-white">
      <Helmet title="Contactanos">
        <CommonSection title="Contactanos" />
        <section>
          <Container>
            <Row>
              <Col lg="7" md="7">
                <h6 className="font-bold mb-4">Ponte en contacto</h6>
                <Form onSubmit={handleFormSubmit}>
                  <FormGroup className="contact__form">
                    <Input
                      placeholder="Tu nombre"
                      type="text"
                      required
                      name="name"
                    />
                  </FormGroup>
                  <FormGroup className="contact__form">
                    <Input
                      placeholder="Email"
                      type="email"
                      required
                      name="email"
                    />
                  </FormGroup>
                  <FormGroup className="contact__form">
                    <textarea
                      rows="5"
                      placeholder="Mensaje"
                      className="textarea"
                      required
                      name="message"
                    ></textarea>
                  </FormGroup>

                  <button className="contact__btn" type="submit">
                    Enviar mensaje
                  </button>
                </Form>
              </Col>

              <Col lg="5" md="5">
                <div className="contact__info">
                  <h6 className="font-bold">Información de Contacto</h6>
                  <p className="section__description mb-0">
                    {sedePrincipal.direccion}
                  </p>
                  <div className="flex items-center gap-2">
                    <h6 className="text-xs mb-0">Phone:</h6>
                    <p className="section__description mb-0">
                      {sedePrincipal.telefono}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <h6 className="mb-0 text-xs">Email:</h6>
                    <p className="section__description mb-0">
                      {sedePrincipal.email}
                    </p>
                  </div>

                  <h6 className="font-bold mt-4">Follow Us</h6>

                  <div className="flex items-center gap-4 mt-3">
                    {socialLinks.map((item, index) => (
                      <Link
                        to={item.url}
                        key={index}
                        className="social__link-icon"
                      >
                        <i className={item.icon}></i>
                      </Link>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    </div>
  );
};

export default Contact;