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
import RemoveCardConfirmModal from "@/components/Modals/RemoveCardConfirmModal/RemoveCardConfirmModal.tsx";
import LevelIndicator from "@/components/LevelIndicator/LevelIndicator.tsx";
import {resolveIntervalStrValues} from "@/generals.service.ts";


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
                cell: ({ row }) => {
                    return <div className="data-table-cell">{resolveIntervalStrValues(row.getValue('intervalStrength'))}</div>;
                }
            },

            {
                accessorKey: 'level',
                header: "Level",
                cell: ({ row }) => <div className="data-table-cell">
                    <LevelIndicator level={row.getValue('level')} />
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
                                <Button variant="ghost" className="popup-menu-card-button"
                                        onClick={() => openEditCardModal(
                                            row.original,
                                            deckId!,
                                            refetchCardsFn)
                                }>
                                    <PencilIcon style={{marginRight: '15px'}}/>
                                    Edit
                                </Button>
                                <Button
                                    variant="ghost" className="popup-menu-card-button remove-button"
                                    onClick={() => openDeleteCardConfirm(
                                        deckId!,
                                        row.original.cardId as unknown as string,
                                        refetchCardsFn)
                                }>
                                    <Trash2Icon style={{marginRight: '15px'}}/>
                                    Remove
                                </Button>
                            </PopoverContent>
                        </Popover>
                    </div>;
                }
            },
        ]
    }, [refetchCardsFn])
}

function openEditCardModal(selectedCard: CardTableEntity, deckId: string, refetchCardsFn: () => void) {
    ModalBoxes.open({
        className: 'edit-card-modal',
        title: 'Edit card',
        component: <EditExistingCardModal card={selectedCard} deckId={deckId} refetchCardsFn={refetchCardsFn} />,
        onClose: () => {}
    })
}

function openDeleteCardConfirm(deckId: string, cardId: string, refetchCardsFn: () => void) {
    ModalBoxes.open({
        className: 'remove-card-confirm-modal',
        title: 'Delete card',
        component: <RemoveCardConfirmModal deckId={deckId} cardId={cardId!} />,
        onClose: () => refetchCardsFn()
    })
}

