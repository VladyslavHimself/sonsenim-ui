import './CardListTableContent.scss';
import {CardTableEntity} from "@/pages/CardListPage.tsx";
import {DataTable} from "@/components/DataTable/DataTable.tsx";
import useCardListTableColumns from "@/components/CardListTableContent/useCardListTableColumns.tsx";

type Props = {
    deckCards: CardTableEntity[],
    refetchCards: () => void,
}

export default function CardListTableContent({ deckCards, refetchCards }: Props) {
    const cardListColumns = useCardListTableColumns(refetchCards);

    if (!deckCards) return null;

    return (
        <div className="card-list-table-content">
            <DataTable columns={cardListColumns} data={deckCards} />
        </div>
    );
};