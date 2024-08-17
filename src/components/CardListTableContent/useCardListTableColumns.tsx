import {useMemo} from "react";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {MoreVerticalIcon, PencilIcon, Trash2Icon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useParams} from "react-router-dom";
import {ColumnDef} from "@tanstack/react-table";
import {CardTableEntity} from "@/pages/CardListPage.tsx";
import ModalBoxes from "@/ModalBoxes/ModalBoxes.tsx";
import EditExistingCardModal from "@/components/Modals/CardModals/EditExistingCardModal.tsx";


export default function useCardListTableColumns(refetchCardsFn: () => void) {

    return useMemo((): ColumnDef<CardTableEntity>[] => {
        return [
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
                // TODO: Rewrite sizing for table after main tasks
                accessorKey: 'select',
                header: "",
                cell: ({ row }) => {
                    const { deckId } = useParams();
                    return <div className="data-table-cell">
                        <Popover>
                            <PopoverTrigger><MoreVerticalIcon /></PopoverTrigger>
                            <PopoverContent side="left">
                                <Button variant="ghost" className="popup-menu-card-button" onClick={() => openEditCardModal(row.original, deckId!, refetchCardsFn)}>
                                    <PencilIcon style={{marginRight: '15px'}}/>Edit
                                </Button>
                                <Button variant="ghost" className="popup-menu-card-button remove-button"><Trash2Icon style={{marginRight: '15px'}}/>Remove</Button>
                            </PopoverContent>
                        </Popover>
                    </div>;
                }
            },
        ]
    }, [])
}

function openEditCardModal(selectedCard: CardTableEntity, deckId: string, refetchCardsFn: () => void) {
    ModalBoxes.open({
        className: 'edit-card-modal',
        title: 'Edit card',
        component: <EditExistingCardModal card={selectedCard} deckId={deckId} refetchCardsFn={refetchCardsFn} />,
        onClose: () => {}
    })
}