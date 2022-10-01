import { useMemo } from "react";
import { CountriesAPI, TimezoneService } from "../../services";
import LangData from "../../mock/languages.json";

type optionItem_Type = {
    label: string,
    value: string
}

export function useServices() {
    const countriesApi = new CountriesAPI();
    const timezoneService = new TimezoneService();
    const langData: {[key: string]: {name: string, nativeName: string}} = {...LangData};
    const languageData = Object.keys(langData).map((key: string) => {
        return {
            label: langData[key].name,
            value: key
        }
    })

    async function getCountriesOptionList(): Promise<{label: string, value: string}[]> {
        const optionListData = await countriesApi.getCountryTitlesInitials().then((list)=> {
            return list.sort((a: optionItem_Type, b: optionItem_Type)=> {
                return (a?.label > b?.label) ? 1 : ((a?.label < b?.label) ? -1 : 0);
            })
        });

        return optionListData;
    }

    async function getTimeZoneList(): Promise<{label: string, value: string}[]> {
        const timezones = await timezoneService.getAllValidTimezones();

        return timezones.data.map((zone: string) => { return {label: zone, value: zone}});
    }

    function getLanguagesData(): {label: string, value: string}[] {
        return languageData;
    }

    return {
        getCountriesOptionList,
        getTimeZoneList,
        languageData,
    }
}