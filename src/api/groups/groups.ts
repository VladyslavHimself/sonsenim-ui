import axios from "axios";

export type UserGroupResponse = {
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

export type EditGroupConfigurationBody = {
    groupName: string,
}

const GroupsApi = {
    getUserGroups() {
        return axios.get<UserGroupResponse[]>('/api/groups/');
    },

    getGroupStatistics(groupId: number) {
        return axios.get<UserGroupsStatisticsResponse>(`/api/groups/stats/${groupId}`);
    },

    getUserGroupsInfo() {
        return axios.get<UserGroupsInfoResponse[]>(`/api/groups/user-groups-info`);
    },

    addUserGroup(groupName: string) {
        return axios.post(`/api/groups/add/${groupName}`);
    },

    deleteUserGroup(groupId: number) {
        return axios.delete(`/api/groups/${groupId}`);
    },

    updateUserGroup(groupId: number, groupConfiguration: EditGroupConfigurationBody) {
        return axios.put<UserGroupResponse>(`/api/groups/${groupId}`, groupConfiguration);
    }

};

export default GroupsApi;