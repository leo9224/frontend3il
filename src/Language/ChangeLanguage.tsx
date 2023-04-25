import React from "react";
import i18n from "../i18n";

function ChangeLanguage() {
    const [language, setLanguage] = React.useState(i18n.language)

    const onLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const chosenLanguage = event.target.value
        if (chosenLanguage !== language) {
            i18n.changeLanguage(chosenLanguage).then(response => console.log(response))
            setLanguage(chosenLanguage)
        }
    }

    return (
        <select onChange={onLanguageChange}>
            <option value={"en"} selected={language === "en"}>English</option>
            <option value={"fr"} selected={language === "fr"}>Français</option>
        </select>
    )
}

export default ChangeLanguage