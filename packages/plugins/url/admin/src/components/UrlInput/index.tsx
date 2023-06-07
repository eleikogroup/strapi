import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useQueryParams } from '@strapi/helper-plugin';

import {
  SingleSelect,
  SingleSelectOption,
  Flex,
  Field,
  FieldHint,
  FieldError,
  FieldLabel,
  TextInput,
} from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { isArray, get } from 'lodash-es';
import splitOnFirst from 'split-on-first';

interface UrlInputProps {
  intlLabel: { id: string; defaultMessage: string };
  onChange: (e: any) => unknown;
  attribute: {
    allowedTypes?: string[];
  };
  name: string;
  description?: object;
  disabled?: boolean;
  error?: string;
  labelAction?: object;
  required?: boolean;
  value?: string;
}

const defaultOptions = ['Variant', 'Product', 'Category', 'Page', 'External', 'Overlay'];

const UrlInput = (props: UrlInputProps) => {
  const { formatMessage } = useIntl();
  const {
    attribute,
    description,
    disabled,
    error,
    intlLabel,
    labelAction,
    name,
    onChange,
    required,
    value: rawValue,
  } = props;

  const options = useMemo(
    () => (isArray(attribute.allowedTypes) ? attribute.allowedTypes : defaultOptions),
    [attribute.allowedTypes]
  );

  const [{ query }] = useQueryParams();
  const locale = get(query, 'plugins.i18n.locale', 'en-us');
  const [data, setData] = useState({ type: options[0], value: '' });

  const setType = (type: string) => {
    const value = `${type}:`;
    onChange({ target: { name, value } });
  };

  const setValue = (value: string) => {
    onChange({ target: { name, value: `${data.type}:${value}` } });
  };

  useEffect(() => {
    if (!rawValue) {
      setData({ type: options[0], value: '' });
    } else {
      const [type, value] = splitOnFirst(rawValue, ':');
      setData({ type, value: value || '' });
    }
  }, [rawValue, options]);

  return (
    <Field
      name={name}
      id={name}
      // GenericInput calls formatMessage and returns a string for the error
      error={error}
      hint={description && formatMessage(description)}
      required={required}
    >
      <Flex direction="column" alignItems="stretch" gap={1}>
        <FieldLabel action={labelAction}>{formatMessage(intlLabel)}</FieldLabel>
        <Flex style={{ width: '100%', marginTop: -4 }} gap={1}>
          <div style={{ width: 100 }}>
            <SingleSelect aria-label="type" value={data.type} onChange={setType}>
              {options.map((label) => {
                return (
                  <SingleSelectOption key={label} value={label}>
                    {label}
                  </SingleSelectOption>
                );
              })}
            </SingleSelect>
          </div>
          <div style={{ flexGrow: 1, paddingTop: 4 }}>
            <TextInput
              placeholder={'Url'}
              aria-label="url"
              name="content"
              onChange={(e: any) => setValue(e.target.value)}
              value={data.value}
            />
          </div>
        </Flex>
        <FieldHint />
        <FieldError />
      </Flex>
    </Field>
  );
};

UrlInput.defaultProps = {
  description: null,
  disabled: false,
  error: null,
  labelAction: null,
  required: false,
  value: '',
};

UrlInput.propTypes = {
  intlLabel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  attribute: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.object,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  labelAction: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default UrlInput;
