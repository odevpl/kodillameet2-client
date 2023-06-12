import { Form, Button, Alert, Nav } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';

const options = [
  {
    name: "JavaScript",
    value: "javascript"
  },
  {
    name: "Python",
    value: "python"
  }
];

const AddTrainieeForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [type, setType] = useState('javascript');
  const [uuid, setUuid] = useState('');
  const [status, setStatus] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();

    if(name === '' || surname === '') {
      setStatus('error');
    } else {
      setStatus('success');
      // prepared data for backend
      const data = {
        name,
        surname,
        type,
        uuid
      };
    };
  };

  const changeHandler = (e) => {
    setType(e.target.value);
  };

  useEffect(() => {
    setUuid(uuidv4());
  }, []);

  if(status === "success") {
    return (
      <div className="mb-3">
        <Alert variant="success">Kursant został poprawnie dodany.</Alert>
        <Nav.Link href={`?user_uuid=${uuid}`}style={{textAlign: "center"}}>{uuid}</Nav.Link>
      </div>
    )
  }

  return (
    <div>
      {status === 'error' ? 
      <Alert variant="danger">Musisz uzupełnić wszystkie pola.</Alert> 
      : 
      null}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicName" >
          <Form.Label>Imię</Form.Label>
          <Form.Control type="text" placeholder="Wpisz imię"  onChange={e => setName(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSurname">
          <Form.Label>Nawisko</Form.Label>
          <Form.Control type="text" placeholder="Nazwisko"  onChange={e => setSurname(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Typ</Form.Label>
          <Form.Select onChange={(e) => changeHandler(e)}>
            {options.map(option => 
              <option key={option.value} value={option.value} onChange={() => setType(option.value)}>{option.name}</option> 
            )}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Numer UUID</Form.Label>
          <Form.Control placeholder={uuid} disabled />
        </Form.Group>
        <Button variant="primary" type="submit">
          Zapisz
        </Button>
      </Form>
    </div>
  )
};

export default AddTrainieeForm;