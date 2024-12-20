//React
import React, { useState } from "react";
// React-Bootstrap
import { Button, Card, Form, InputGroup } from "react-bootstrap";
// Component
import Title from "../../Title/Title";

////////////////////////////////
//         Properties         //
////////////////////////////////

export interface SearchCriteriaProperties {
    // Title of the section
    title?: string;
    // Function to translate the text in the application
    language?: (key: string) => string;
    // Label of the submit button
    submitButtonLabel?: string;
    // Function to call on submit
    onSubmit?: (searchParams: { [key: string]: string }) => void;
    // Label of the reset button
    resetButtonLabel?: string;
    // Function to call on reset
    onReset?: () => void;
    // Array of inputs that will generate SearchParameters
    inputs: Input[];
    // Fixed parameters for the Query
    fixedParameters?: { [key: string]: string };
}

export interface Input {
    // Label of the input
    label: string;
    // Place holder for the field
    placeholder?: string;
    // Type of the input
    type: string;
    // Options of the select
    options?: { value: string, label: string }[];
    // Associated SearchParameter Name
    searchParamsName: string;
}

const SearchCriteria: React.FC<SearchCriteriaProperties> = (configs) => {

    ////////////////////////////////
    //           State            //
    ////////////////////////////////

    //Form build out of SearchParameters names.
    const [form, setForm] = useState<{ [key: string]: string }>(
        configs.inputs.reduce((acc, curr) => ({ ...acc, [curr.searchParamsName]: '' }), {})
    );

    ////////////////////////////////
    //          Actions           //
    ////////////////////////////////

    /**
    * Handle the change of the form.
    *
    * @param event     the event of the change.
    */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    /**
    * Build the search parameters from the params.
    *
    * @param values    the values to search on.
    * @returns         the search parameters.
    */
    function buildSearchParameters(values: { [key: string]: string }): { [key: string]: string } {
        let searchParams: { [key: string]: string } = { ...configs.fixedParameters };

        Object.entries(values).forEach(([key, value]) => {
            if (value && value.length > 0) {
                searchParams[key] = value;
            }
        });

        return searchParams;
    }

    /**
     * Submit the form.
     */
    const onSubmit = () => {
        if (configs.onSubmit) {
            configs.onSubmit(buildSearchParameters(form));
        }
    };

    /**
     * Reset the form.
     */
    function onReset() {
        setForm(configs.inputs.reduce((acc, curr) => ({ ...acc, [curr.searchParamsName]: '' }), {}));
        if (configs.onReset) {
            configs.onReset();
        }
    }

    ////////////////////////////////
    //          Content           //
    ////////////////////////////////

    return (
        <Card>
            <Card.Header>
                <Title
                    level={2}
                    content={configs.title ||
                        (configs.language ?
                            configs.language('title.searchcriteria')
                            : 'Search Criteria')
                    } />
            </Card.Header>
            <Card.Body className="d-flex flex-column gap-4">
                <div className="d-flex flex-wrap gap-4">
                    {configs.inputs.map((input, index) => (
                        <div
                            key={index}
                            className="md-flex-container"
                        >
                            <Form.Label>
                                {input.label} :
                            </Form.Label>
                            {input.type === 'select' ?
                                <Form.Select
                                    name={input.searchParamsName}
                                    value={form[input.searchParamsName] || ''}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(e)}                                    >
                                    <option value=''>
                                        {input.placeholder ?? input.label}
                                    </option>
                                    {input.options?.map((option, index) => (
                                        <option
                                            key={index}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </Form.Select> :
                                <InputGroup>
                                    <Form.Control
                                        type={input.type}
                                        name={input.searchParamsName}
                                        placeholder={input.placeholder}
                                        value={form[input.searchParamsName]}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                    />
                                </InputGroup>
                            }
                        </div>
                    ))}
                </div>
                <div className="d-flex flex-wrap align-items-start gap-4">
                    <Button
                        className="button"
                        variant="primary"
                        onClick={() => onSubmit()}
                    >
                        {configs.submitButtonLabel ||
                            (configs.language ?
                                configs.language('button.search')
                                : 'Search')
                        }

                    </Button>
                    <Button
                        className="button"
                        variant="secondary"
                        onClick={() => onReset()}
                    >
                        {configs.resetButtonLabel ||
                            (configs.language ?
                                configs.language('button.reset')
                                : 'Reset')
                        }
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default SearchCriteria;