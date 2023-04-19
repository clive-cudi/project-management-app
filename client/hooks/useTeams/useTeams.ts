import { useTeamsStore } from "../store"

export function useTeams() {
    const { teams } = useTeamsStore();

    // get the teams that the user is part of and sorts them by organization
    function getMemberTeamsByOrganization() {
        return teams.map((tm) => {
            const { parentOrgID } = tm;

            return {
                [parentOrgID]: tm
            }
        })
    }

    return {
        teams,
        getMemberTeamsByOrganization
    }
}