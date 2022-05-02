import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Input,
  FormGroup,
  Label,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export default function VolcanoList(props) {
  const countries = props.countries;

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(props.country);
  // show max of 5 items
  const [countrySuggestions, setCountrySuggestions] = useState(
    countries.slice(0, 5)
  );

  function filterResults(value) {
    if (value !== "") {
      let result = countries.filter((item) => item.includes(value));
      setCountrySuggestions(result.slice(0, 5));
    } else {
      setCountrySuggestions(countries.slice(0, 5));
    }
  }

  function toggleDropdown() {
    isOpen === false ? setIsOpen(true) : setIsOpen(false);
  }

  function handleQuery(event) {
    setQuery(event.target.value);
    filterResults(event.target.value);
    setIsOpen(true);
  }

  function handleDropdownSelect(value) {
    setQuery(value);
  }

  function DropdownItemComponent(props) {
    return (
      <DropdownItem onClick={() => handleDropdownSelect(props.value)}>
        {props.value}
      </DropdownItem>
    );
  }

  function handleSubmit() {
    if (query === "") {
      props.setCountry(0); // Return empty code
    } else {
      props.setCountry(query);
    }
  }

  return (
    <Form>
      <FormGroup>
        <Row xs="auto">
          <Col className="auto-width vertical-center">
            <Label className="vertical-center" for="country">
              Country
            </Label>
          </Col>
          <Col className="auto-width">
            <Dropdown isOpen={isOpen} toggle={toggleDropdown}>
              <Row xs="auto">
                <Col className="auto-width no-padding">
                  <Input
                    id="search"
                    name="search"
                    value={query}
                    onChange={handleQuery}
                  ></Input>
                </Col>
                <Col className="auto-width no-padding">
                  <DropdownToggle className="caret" caret></DropdownToggle>
                </Col>
              </Row>
              <DropdownMenu>
                {countrySuggestions.map((country) => (
                  <DropdownItemComponent key={country} value={country} />
                ))}
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </FormGroup>
      <Button onClick={handleSubmit}>Submit</Button>
    </Form>
  );
}
