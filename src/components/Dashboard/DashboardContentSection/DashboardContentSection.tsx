import './DashboardContentSection.scss';
import {useQueryClient} from "@tanstack/react-query";
import {UserGroupResponse} from "@/api/groups/groups.ts";
import NoGroupsAlert from "@/components/Dashboard/DashboardContentSection/NoGroupsAlert.tsx";
import useUserGroupStatistics from "@/api/groups/useUserGroupStatistics.ts";
import {SelectionItem} from "@/components/ui/combobox.tsx";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import ContentCard from "@/components/ContentCard/ContentCard.tsx";
import useCardsIntervalHistory from "@/api/cards/useCardsIntervalHistory.ts";
import {useMemo} from "react";

type Props = {
    selectedGroup: SelectionItem
}

export default function DashboardContentSection({ selectedGroup }: Props) {
    const query = useQueryClient();
    const { groupStats } = useUserGroupStatistics(selectedGroup.value);
    const isUserHaveAnyGroups =
        query.getQueryData<UserGroupResponse[]>(['user-groups'])?.length;

    const { cardsIntervalHistoryData, actualDayInfo } = useCardsIntervalHistory(selectedGroup.value);

    const domainGaps = useMemo(() => {
        if (!cardsIntervalHistoryData) return [];
        const allValues = cardsIntervalHistoryData!.flatMap(item =>
            Object.values(item).filter(value => typeof value === "number")
        );

        return [Math.max(...allValues), Math.min(...allValues)]
    }, [cardsIntervalHistoryData]);

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
                <ContentCard title="Decks created" information={groupStats?.decksTotal.toString()} />
                <ContentCard title="Studied cards" information={groupStats?.cardsTotal.toString()} />
            </div>

            <h2>Weekly report</h2>
            <div className="weekly-report-chart-container">
                <div className="weekly-report-chart-legend">
                    <div className="weekly-report-chart-legend-item">
                        <div>Begin</div>
                        <div>{actualDayInfo?.veryLowIndicationCount}</div>
                    </div>

                    <div className="weekly-report-chart-legend-item">
                        <div>Low</div>
                        <div>{actualDayInfo?.lowIndicationCount}</div>
                    </div>

                    <div className="weekly-report-chart-legend-item">
                        <div>Med</div>
                        <div>{actualDayInfo?.midIndicationCount}</div>
                    </div>

                    <div className="weekly-report-chart-legend-item">
                        <div>High</div>
                        <div>{actualDayInfo?.highIndicationCount}</div>
                    </div>
                </div>
                {cardsIntervalHistoryData && <div className="weekly-report-chart">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={cardsIntervalHistoryData}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date" />
                            <YAxis domain={domainGaps} tickCount={6}  />
                            <Tooltip/>
                            <Line type="monotone" name="High" dataKey="highIndicationCount" stroke="#9D00D5" strokeWidth={3}
                                  activeDot={{r: 8}}/>
                            <Line type="monotone" name="Medium" dataKey="midIndicationCount" stroke="#E1BD00" strokeWidth={3}
                                  activeDot={{r: 8}}/>
                            <Line type="monotone" name="Low" dataKey="lowIndicationCount" stroke="#E82626" strokeWidth={3}
                                  activeDot={{r: 8}}/>
                            <Line type="monotone" name="Beginner" dataKey="veryLowIndicationCount" stroke="#50a121" strokeWidth={3}
                                  activeDot={{r: 8}}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>}
            </div>
        </div>
    );
};