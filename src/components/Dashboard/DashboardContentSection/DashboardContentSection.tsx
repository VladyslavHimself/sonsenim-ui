import './DashboardContentSection.scss';
import {useQueryClient} from "@tanstack/react-query";
import {UserGroupResponse} from "@/api/groups/groups.ts";
import NoGroupsAlert from "@/components/Dashboard/DashboardContentSection/NoGroupsAlert.tsx";
import useUserGroupStatistics from "@/api/groups/useUserGroupStatistics.ts";
import {SelectionItem} from "@/components/ui/combobox.tsx";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

type Props = {
    selectedGroup: SelectionItem
}

const mockedDS = [
    {
        date: '01/13',
        vlow: 11,
        low: 12,
        mid: 13,
        high: 14
    },
    {
        date: '02/13',
        vlow: 8,
        low: 15,
        mid: 11,
        high: 17
    },
    {
        date: '03/13',
        vlow: 4,
        low: 19,
        mid: 5,
        high: 23
    },
    {
        date: '04/13',
        vlow: 18,
        low: 19,
        mid: 5,
        high: 23
    },
    {
        date: '05/13',
        vlow: 15,
        low: 19,
        mid: 8,
        high: 23
    },

    {
        date: '06/13',
        vlow: 10,
        low: 24,
        mid: 3,
        high: 28
    },

    {
        date: '07/13',
        vlow: 2,
        low: 15,
        mid: 20,
        high: 28
    },
]

export default function DashboardContentSection({ selectedGroup }: Props) {
    console.log(selectedGroup)
    const query = useQueryClient();
    const { groupStats } = useUserGroupStatistics(selectedGroup.value);
    const isUserHaveAnyGroups =
        query.getQueryData<UserGroupResponse[]>(['user-groups'])?.length;

    if (!isUserHaveAnyGroups) {
        return (
            <div className="dashboard-content-section">
                <NoGroupsAlert/>
            </div>
        )
    }

    return (
        <div className="dashboard-content-section">
            <h1>Dashboard</h1>
            <div className="dashboard-content-strip">
                <div className="dashboard-content-card">
                    <span className="dashboard-content-card-count">{groupStats?.decksTotal || '-'}</span>
                    <span className="dashboard-content-card-topic">Decks created</span>
                </div>

                <div className="dashboard-content-card">
                    <span className="dashboard-content-card-count">{groupStats?.cardsTotal || '-'}</span>
                    <span className="dashboard-content-card-topic">Studied cards</span>
                </div>
            </div>

            <h2>Weekly report</h2>
            <div className="weekly-report-chart-container">
                <div className="weekly-report-chart-legend">
                    <div className="weekly-report-chart-legend-item">
                        <div>Begin</div>
                        <div>12</div>
                    </div>

                    <div className="weekly-report-chart-legend-item">
                        <div>Low</div>
                        <div>12</div>
                    </div>

                    <div className="weekly-report-chart-legend-item">
                        <div>Med</div>
                        <div>12</div>
                    </div>

                    <div className="weekly-report-chart-legend-item">
                        <div>High</div>
                        <div>12</div>
                    </div>
                </div>
                <div className="weekly-report-chart">
                    <ResponsiveContainer width="100%" height="100%" >
                        <LineChart
                            width={500}
                            height={300}
                            data={mockedDS}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                            // TODO: Make domain max integer related to max count cards value
                        <YAxis domain={[0, 30]} tickCount={6} ticks={[0, 10, 20, 30]}  />
                        <Tooltip />
                        <Line type="monotone" name="High" dataKey="high" stroke="#9D00D5" strokeWidth={3} activeDot={{ r: 8 }} />
                        <Line type="monotone" name="Medium" dataKey="mid" stroke="#E1BD00" strokeWidth={3} activeDot={{ r: 8 }} />
                        <Line type="monotone" name="Low" dataKey="low" stroke="#E82626" strokeWidth={3} activeDot={{ r: 8 }} />
                        <Line type="monotone" name="Beginner" dataKey="vlow" stroke="#50a121" strokeWidth={3} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};