export interface UserProfile {
    uid: string;
    username: string;
    email: string;
    profilePicUrl?: string;
    about?: string;
    isVerified: boolean;
    info?: {
        address?: {
            country?: string;
            location?: string;
            street?: string
        }
        skills?: string[];
        gender?: string;
        timezones: {
            default: string;
            other: string[]
        }
        phone?: string
        language?: string
    }
}