import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ListFilter} from "lucide-react";
import PageHeaderSection from "@/components/Dashboard/DashboardHeaderSection/PageHeaderSection.tsx";
import useCards from "@/api/cards/useCards.ts";
import {useParams} from "react-router-dom";
import {Card} from "@/api/cards/cards.ts";
import CardListTableContent from "@/components/CardListTableContent/CardListTableContent.tsx";
import {useMemo} from "react";
import {resolveStrengthLevel} from "@/generals.service.ts";

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
            <PageHeaderSection>
                <div className="groups-header-section">
                    <Input placeholder="Search" className="groups-header-input"/>
                    <Button variant="outline" className="groups-header-button"><ListFilter/></Button>
                </div>
            </PageHeaderSection>
            <CardListTableContent deckCards={cardEntitiesForTable!} refetchCards={refetch}/>
        </div>
    );
}





