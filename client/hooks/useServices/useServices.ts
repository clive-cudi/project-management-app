import { CountriesAPI, TimezoneService } from "../../services"

type optionItem_Type = {
    label: string,
    value: string
}

export function useServices() {
    const countriesApi = new CountriesAPI();
    const timezoneService = new TimezoneService();

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

    return {
        getCountriesOptionList,
        getTimeZoneList
    }
}