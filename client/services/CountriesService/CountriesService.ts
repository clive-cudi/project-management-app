import axios from "axios";
import CountryData from "../../mock/countries.json";

export class CountriesAPI {
    COUNTRIES_API_URL: string
    constructor() {
        this.COUNTRIES_API_URL = `https://restcountries.com/v3.1/all`;
        this.getAllCountries = this.getAllCountries.bind(this);
        this.getCountryTitles = this.getCountryTitles.bind(this);
        this.getCountryInitials = this.getCountryInitials.bind(this);
        this.getFlagUrls = this.getFlagUrls.bind(this);
        this.getCountryTitleInitialsFlag = this.getCountryTitleInitialsFlag.bind(this);
    }

    getAllCountries = async () =>{
        // const response = await axios.get(this.COUNTRIES_API_URL);
        const response = CountryData;
        return response;
    }

    getCountryTitles = async ()=>{
        const country_data = await this.getAllCountries();
        return country_data.map((country: any) => country.name.common as string);
    }

    getCountryInitials = async ()=>{
        const countries = await this.getAllCountries();
        return countries.map((country: any) => country.cca2 as string);
    }

    getFlagUrls = async ()=>{
        const country_data = await this.getAllCountries();
        return country_data.map((country: any) => country.flags.png as string);
    }

    getCountryTitleInitialsFlag = async ()=>{
        const country_data = await this.getAllCountries();
        return country_data.map((country: any) => ({label: country.name.common as string, value: country.cca2 as string, icon: country.flags.png as string}));
    }

    getCountryTitlesInitials = async () => {
        const country_data = await this.getAllCountries();
        return country_data.map((country: any) => {
            return {
                label: country.name.common as string,
                value: country.cca2 as string
            }
        })
    }
}