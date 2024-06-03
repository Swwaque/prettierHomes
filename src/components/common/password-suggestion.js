import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { HiCheckCircle, HiMinusCircle } from "react-icons/hi2";
import './password-suggestion.scss';
import { useTranslation } from 'react-i18next';

const PasswordSuggestion = ({ formik, field, label }) => {

    const calculatePasswordStrength = (password) => {
        const totalCriteria = 5;
        let fulfilledCriteria = 0;

        if (/[a-z]+/.test(password)) fulfilledCriteria++;
        if (/[A-Z]+/.test(password)) fulfilledCriteria++;
        if (/[\d+]+/.test(password)) fulfilledCriteria++;
        if (/[!@#$%^&*()_+\-={};':"|,.<>?]+/.test(password)) fulfilledCriteria++;
        if (password.length >= 8) fulfilledCriteria++;

        return Math.floor((fulfilledCriteria / totalCriteria) * 100);
    };
    const {t} = useTranslation();

    const getProgressBarVariant = (strength) => {
        if (strength <= 20) return t("passwordSuggestion.none");
        if (strength <= 40) return t("passwordSuggestion.bad");
        if (strength <= 60) return t("passwordSuggestion.weak");
        if (strength <= 80) return t("passwordSuggestion.average");
        return t("passwordSuggestion.strong");
    };

    const getPasswordSuggestions = (password) => {
        const suggestions = [
            {
                message: t("passwordSuggestion.suggestionMessagesMin"),
                fulfilled: password.length >= 8,
            },
            {
                message: t("passwordSuggestion.suggestionMessagesLower"),
                fulfilled: /[a-z]+/.test(password),
            },
            {
                message: t("passwordSuggestion.suggestionMessagesUpper"),
                fulfilled: /[A-Z]+/.test(password),
            },
            {
                message: t("passwordSuggestion.suggestionMessagesOneNumber"),
                fulfilled: /[\d+]+/.test(password),
            },
            {
                message: t("passwordSuggestion.suggestionMessagesSpecial"),
                fulfilled: /[!@#$%^&*()_+\-={};':"|,.<>?]+/.test(password),
            },
        ];

        return suggestions.map(({ message, fulfilled }, index) => (
            <div key={index} className={`suggestion ${fulfilled ? 'fulfilled' : 'unfulfilled'}`}>
                {fulfilled ? <HiCheckCircle /> : <HiMinusCircle />} {message}
            </div >
        ));
    };

    const strength = calculatePasswordStrength(formik.values[field]);

    return (
        <>
            <div className="password-suggestions-container" >
                <div className="progress-bar-wrapper">
                    <div className="strength-label">
                        {t("passwordSuggestion.strengthLabel")} : {getProgressBarVariant(strength).toUpperCase()}
                    </div>
                    <ProgressBar
                        className={`password-strength-bar ${getProgressBarVariant(strength)}`}
                        animated={strength !== 100}
                        striped
                        now={strength}
                        label={label ? `${strength}%` : ""}
                    />
                </div>
                {getPasswordSuggestions(formik.values[field])}
            </div>
        </>
    )
}

export default PasswordSuggestion