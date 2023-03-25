import { create } from "zustand";
import { teamsRes } from "../../types";
import { getUniqueListBy } from "../../utils";

interface teamsStoreType {
    teams: teamsRes[],
    teamIds: string[]
    add: (team: teamsRes) => void
    addMultiple: (teams: teamsRes[]) => void
    remove: (tid: string) => void
    removeMultiple: (tids: string[]) => void
}

export const useTeamsStore = create<teamsStoreType>()((set) => {
    return {
        teams: [],
        teamIds: [],
        add(team) {
            return set((state) => {
                return {
                    teams: getUniqueListBy<teamsRes, "tid">([...state.teams, team], "tid")
                }
            })
        },
        addMultiple(teams) {
            return set((state) => ({teams: getUniqueListBy([...state.teams, ...teams], "tid")}))
        },
        remove(tid) {
            return set((state) => ({teams: getUniqueListBy([...state.teams].filter((tm_) => tm_.tid !== tid), "tid")}))
        },
        removeMultiple(tids) {
            return set((state) => ({teams: getUniqueListBy([...state.teams].filter((tm_) => !tids.includes(tm_.tid)), "tid")}))
        },
    }
})