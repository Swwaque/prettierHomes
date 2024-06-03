import React from 'react'
import { Fieldset } from 'primereact/fieldset'
import { HiChevronDown } from "react-icons/hi2";
import './field-wrapper.scss'

const FieldWrapper = ({ className, label, children }) => {

    const uppercasedLabel = typeof label === 'string' ? label.toUpperCase() : 'FIELD';

    const customLegend = (
        <div className="custom-lagend">
            <HiChevronDown strokeWidth={1.5} />
            <span className="">{uppercasedLabel}</span>
        </div>
    );

    return (
        <>
            <Fieldset
                className={className}
                legend={customLegend}
                collapsed
                toggleable
                pt={{
                    togglerIcon: { className: 'd-none' }
                }}
            >
                {children}
            </Fieldset>
        </>
    )
}

export default FieldWrapper