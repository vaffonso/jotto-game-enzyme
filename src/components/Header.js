import React, { useState } from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';


const Header = () => {

    const [expanded, setExpanded] = useState(false);

    return (
        <header>
            <Navbar expanded={expanded} bg="dark" variant="dark" expand="true">
                <Navbar.Collapse className="justify-content-end">
                    <Container>
                        <Row>
                            <Col sm="8" md="7">
                                <h4 className="text-white">About</h4>
                                <p className="text-muted">Jotto game created on <em>React Testing with Jest and Enzyme</em> course by <a href="https://www.udemy.com/user/bonnie-schulkin/">Bonnie Schulkin</a></p>
                            </Col>
                            <Col sm="4" md="1">
                                <h4 className="text-white">Contact</h4>
                                <ul className="list-unstyled">
                                    <li>
                                        <a className="text-white" href="https://github.com/vaffonso/jotto-game-enzyme">GitHub</a>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </Navbar.Collapse>
                <Navbar.Brand href="/">Jotto</Navbar.Brand>
                <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} />
            </Navbar>
        </header>
    );
}

export default Header;