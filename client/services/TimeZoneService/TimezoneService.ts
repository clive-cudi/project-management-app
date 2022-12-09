import axios from "axios";
import TimezoneData from "../../mock/timezones.json";

export class TimezoneService {
    TIMEZONE_API_BASE_URL: string
    constructor() {
        this.TIMEZONE_API_BASE_URL = `http://worldtimeapi.org/api`;
        this.getAllValidTimezones = this.getAllValidTimezones.bind(this);
    }

    async getAllValidTimezones() {
        const requestUrl = `${this.TIMEZONE_API_BASE_URL}/timezone`;

        // const validTimezoneData = await axios.get(requestUrl);
        
        const validTimezoneData = TimezoneData;

        return validTimezoneData;
    }
}