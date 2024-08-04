import axios from "axios";

export type UserGroupsResponse = {
    id: number,
    groupName: string
}

export type UserGroupsStatisticsResponse = {
    decksTotal: number,
    cardsTotal: number,
}

export type UserGroupsInfoResponse = {
    groupId: number,
    groupName: string,
    decksCount: number
}

const GroupsApi = {
    getUserGroups() {
        return axios.get<UserGroupsResponse[]>('/api/groups/');
    },

    getGroupStatistics(groupId: number) {
        return axios.get<UserGroupsStatisticsResponse>(`/api/groups/stats/${groupId}`);
    },

    getUserGroupsInfo() {
        return axios.get<UserGroupsInfoResponse[]>(`/api/groups/user-groups-info`);
    }
};

export default GroupsApi;