import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Input,
  Label,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export default function VolcanoList(props) {
  const countries = props.countries;
  const ranges = props.ranges;

  const [isOpenCountry, setIsOpenCountry] = useState(false);
  const [isOpenRange, setIsOpenRange] = useState(false);
  const [queryCountry, setQueryCountry] = useState(props.country);
  const [queryRange, setQueryRange] = useState(props.range);
  // show max of 5 items
  const [countrySuggestions, setCountrySuggestions] = useState(
    countries.slice(0, 10)
  );

  function filterResults(value) {
    if (value !== "") {
      let result = countries.filter((item) => {
        return item.toLowerCase().includes(value.toLowerCase());
      });
      setCountrySuggestions(result.slice(0, 10));
    } else {
      setCountrySuggestions(countries.slice(0, 10));
    }
  }

  function toggleDropdownCountry() {
    isOpenCountry === false ? setIsOpenCountry(true) : setIsOpenCountry(false);
  }

  function toggleDropdownRange() {
    isOpenRange === false ? setIsOpenRange(true) : setIsOpenRange(false);
  }

  function handleQuery(event, setOpenType) {
    setQueryCountry(event.target.value);
    filterResults(event.target.value);
    setOpenType(true);
  }

  function handleDropdownSelect(value, handle) {
    handle(value);
  }

  function DropdownItemComponent(props) {
    return (
      <DropdownItem
        onClick={() => handleDropdownSelect(props.value, props.handle)}
      >
        {props.value}
      </DropdownItem>
    );
  }

  function DropdownRangeComponent() {
    return (
      <Col className="auto-width vertical-center">
        <div className="mb-0">
          <Row xs="auto">
            <Col className="auto-width vertical-center">
              <Label className="vertical-center" for="country">
                Populated within:
              </Label>
            </Col>
            <Col className="no-padding-left auto-width vertical-center">
              <Dropdown isOpen={isOpenRange} toggle={toggleDropdownRange}>
                <DropdownToggle className="caret" caret>
                  {queryRange}
                </DropdownToggle>
                <DropdownMenu>
                  {ranges.map((range) => (
                    <DropdownItemComponent
                      key={range}
                      value={range}
                      handle={setQueryRange}
                    />
                  ))}
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
        </div>
      </Col>
    );
  }

  function handleSubmit() {
    if (queryCountry === "") {
      props.setEmpty(true); // Return empty code
    } else {
      props.setEmpty(false);
      props.setCountry(
        // Submit capatalised word.
        queryCountry.charAt(0).toUpperCase() + queryCountry.slice(1)
      );
    }
    props.setInitSubmit(true);
    props.setRange(queryRange);
  }

  return (
    <Form
      className="form-type mb-3"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Row xs="auto">
        <Col className="auto-width vertical-center">
          <div className="mb-0">
            <Row xs="auto">
              <Col className="auto-width vertical-center">
                <Label className="vertical-center" for="country">
                  Country:
                </Label>
              </Col>
              <Col className="auto-width">
                <Dropdown isOpen={isOpenCountry} toggle={toggleDropdownCountry}>
                  <Row xs="auto">
                    <Col className="auto-width no-padding">
                      <Input
                        id="countrySearch"
                        name="countrySearch"
                        value={queryCountry}
                        onChange={(event) => {
                          handleQuery(event, setIsOpenCountry);
                        }}
                      ></Input>
                    </Col>
                    <Col className="auto-width no-padding">
                      <DropdownToggle className="caret" caret></DropdownToggle>
                    </Col>
                  </Row>
                  <DropdownMenu>
                    {countrySuggestions.map((country) => (
                      <DropdownItemComponent
                        key={country}
                        value={country}
                        handle={setQueryCountry}
                      />
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </Col>
            </Row>
          </div>
        </Col>
        {props.token !== null && <DropdownRangeComponent />}
        <Col className="auto-width vertical-center">
          <Button className="form-button" onClick={handleSubmit}>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
