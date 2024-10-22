import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ListFilter} from "lucide-react";
import PageHeaderSection from "@/components/Dashboard/DashboardHeaderSection/PageHeaderSection.tsx";
import useCards from "@/api/cards/useCards.ts";
import {useParams} from "react-router-dom";
import {Card} from "@/api/cards/cards.ts";
import CardListTableContent from "@/components/CardListTableContent/CardListTableContent.tsx";
import {useMemo} from "react";

export type CardTableEntity = Omit<Card,
    'createdAt' | 'nextRepetitionTime'
    > & { level: string }

export default function CardListPage() {
    const { deckId } = useParams();
    const { deckCards, refetch } = useCards(deckId!);

    const cardEntitiesForTable = useMemo(() => {
        return deckCards?.map(({ cardId, intervalStrength, primaryWord, definition, explanation}): CardTableEntity => {
            return {
                cardId,
                level: resolveStrengthLevel(intervalStrength),
                intervalStrength,
                primaryWord,
                definition,
                explanation
            };
        })
    }, [deckCards]);

    return (
        // TODO: Add overflow fix
        <div className="card-list-page layout-wrapper">
            <PageHeaderSection
                LeftCornerSection={() => (
                    <>
                        <div className="groups-header-section">
                            <Input placeholder="Search" className="groups-header-input"/>
                            <Button variant="outline" className="groups-header-button"><ListFilter /></Button>
                        </div>
                    </>
                )}/>
            <CardListTableContent deckCards={cardEntitiesForTable!} refetchCards={refetch} />
        </div>
    );
}

const EIGHT_HOURS = 0.4;
const SEVEN_DAYS = 7;
const NINETY_DAYS = 90;

function resolveStrengthLevel(intervalStrengthTime: number): string {
    if (intervalStrengthTime < EIGHT_HOURS) return "Very low";
    if (intervalStrengthTime < SEVEN_DAYS) return "Low";
    if (intervalStrengthTime < NINETY_DAYS) return "Medium";
    return "High";
}



