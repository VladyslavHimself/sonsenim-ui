import './CardListTableContent.scss';
import {CardTableEntity} from "@/pages/CardListPage.tsx";
import {DataTable} from "@/components/DataTable/DataTable.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {ChevronDown, Edit, MoreVerticalIcon, Pencil, PencilIcon, Trash2Icon, Upload} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";

type Props = {
    deckCards: CardTableEntity[],

}

const cardListColumns: ColumnDef<CardTableEntity>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: 'primaryWord',
        header: "Word",
        cell: ({ row }) => {
            return (
                <div className="data-table-cell">
                    <div className="data-table-cell-primary-word-cell">
                        {row.original.primaryWord}
                    </div>
                    <div className="data-table-cell-definition-cell">
                        {row.original.definition}
                    </div>
                </div>
            )
        },
    },

    {
        accessorKey: 'intervalStrength',
        header: "Interval",
        cell: ({ row }) => <div className="data-table-cell">{row.getValue('intervalStrength')}</div>
    },

    {
        accessorKey: 'level',
        header: "Level",
        cell: ({ row }) => <div className="data-table-cell">
                <div data-level={row.getValue('level')} className="data-table-cell-level-indicator">
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
                {row.getValue('level')}
        </div>
    },

    {
        accessorKey: 'select',
        header: "",
        cell: ({ row }) => {
            console.log(row.original.cardId);
            return <div className="data-table-cell">

                <Popover>
                    <PopoverTrigger><MoreVerticalIcon /></PopoverTrigger>
                    <PopoverContent side="left">
                        <Button variant="ghost" style={{ width: '100%', display: 'flex', justifyContent: 'flex-start'}}><PencilIcon style={{marginRight: '15px'}}/>Edit</Button>
                        <Button variant="ghost" style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', color: 'red'}}><Trash2Icon style={{marginRight: '15px'}}/>Remove</Button>
                    </PopoverContent>
                </Popover>
            </div>;
        }
    },
]

export default function CardListTableContent({ deckCards }: Props) {
    if (!deckCards) return null;

    return (
        <div className="card-list-table-content">
            <DataTable columns={cardListColumns} data={deckCards} />
        </div>
    );
};