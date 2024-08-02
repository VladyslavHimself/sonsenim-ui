import axios from "axios";

export type UserGroupsResponse = {
    id: number,
    groupName: string
}

export type UserGroupsStatistics = {
    decksTotal: number,
    cardsTotal: number,
}

const GroupsApi = {
    getUserGroups() {
        return axios.get<UserGroupsResponse[]>('/api/groups/');
    },

    getGroupStatistics(groupId: number) {
        return axios.get<UserGroupsStatistics>(`/api/groups/stats/${groupId}`);
    }
};

export default GroupsApi;