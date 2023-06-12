import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

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
  const uuid = uuidv4()
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Imię</Form.Label>
          <Form.Control type="text" placeholder="Wpisz imię" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSurname">
          <Form.Label>Nawisko</Form.Label>
          <Form.Control type="text" placeholder="Nazwisko" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Typ</Form.Label>
          <Form.Select>
            {options.map(option => 
              <option key={option.value} value={option.value}>{option.name}</option> 
            )}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Disabled input</Form.Label>
          <Form.Control placeholder={uuid} disabled />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
};

export default AddTrainieeForm;