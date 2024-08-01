import axios from "axios";

type UserGroupsResponse = {
    id: number,
    groupName: string
}

const GroupsApi = {
    getUserGroups() {
        return axios.get<UserGroupsResponse[]>('/api/groups/');
    }
};

export default GroupsApi;