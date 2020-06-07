import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

import stringModule from '../../helpers/strings';
import { useLanguage } from '../../contexts/languageContext';
import { useJottoDispatch, actions } from '../../contexts/jottoContext';

const SecretWordForm = () => {

    const [language] = useLanguage();
    const [mySecretWord, setMySecretWord] = useState('');
    const dispatch = useJottoDispatch();

    const submitMySecret = (ev) => {
        ev.preventDefault();
        dispatch({ type: actions.NEW_WORD, payload: mySecretWord });
    }

    return (
        <Container data-test="secret-word-component">
            <p>Enter a secret word for someone else to guess</p>
            <Form inline className="mt-2">

                <Form.Control
                    data-test="secretword-inputbox"
                    className="mr-2"
                    type="text"
                    value={mySecretWord}
                    onChange={(ev) => setMySecretWord(ev.target.value)}
                />
                <Button variant="primary" type="submit"
                    data-test="secretword-button"
                    disabled={!mySecretWord}
                    onClick={submitMySecret}
                >
                    {stringModule.getStringByLanguage(language, 'submit')}
                </Button>
            </Form>
        </Container>
    );
};

export default SecretWordForm;