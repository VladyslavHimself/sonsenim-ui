import {useParams, useSearchParams} from "react-router-dom";
import '@/styles/layout-wrapper.styles.scss';
import {Input} from "@/components/ui/input.tsx";
import PageHeaderSection from "@/components/DashboardHeaderSection/PageHeaderSection.tsx";
import {ListFilter} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import CardsListContentSection from "@/components/GroupsListContentSection/CardsListContentSection.tsx";
import useAggregatedDecks from "@/api/decks/useAggregatedDecks.ts";
import Card from "@/components/Card/Card.tsx";
import ModalBoxes from "@/modals/ModalBoxes.tsx";
import DeckCardMenubar from "@/components/DeckCardMenubar/DeckCardMenubar.tsx";
import CreateNewDeckModal from "@/components/DeckModals/CreateNewDeckModal/CreateNewDeckModal.tsx";

export default function SelectedGroupPage() {
    const { groupId} = useParams();
    const [searchParams] = useSearchParams();
    const { aggregatedDecks, refetch } = useAggregatedDecks(groupId!);

    return (
        <div className="layout-wrapper">
            <PageHeaderSection
                LeftCornerSection={() => (
                    <>
                        {
                            // TODO: Reminder
                            //        * This should be quicksearch like in MUI.
                            //        * Configurable to other related pages like "Decks" e.t.c
                            //        * With debounce
                            //        * Replace to 'Input.WithIcon' later
                        }
                        <div className="groups-header-section">
                            <Input placeholder="Search" className="groups-header-input"/>
                            <Button variant="outline" className="groups-header-button"><ListFilter /></Button>
                        </div>
                    </>
                )}/>

            <CardsListContentSection Header={() => (
                <>
                    <h1>{searchParams.get('groupName')}</h1>
                    <Button style={{padding: "25px 30px"}} onClick={() => onCreateNewDeckModal(groupId)}>+ Create a new deck</Button>
                </>
            )}>
                {
                    // TODO: Add template (design), if user haven't any decks here
                    aggregatedDecks?.map((deck) => (
                        <Card
                            key={groupId}
                            cardTitle={deck.deckName}
                            secondaryTile={<div>{`${deck.cardsInDeckTotal} cards`}</div>}
                            onClickHandler={() => ModalBoxes.open({
                                className: 'deck-menubar',
                                component: <DeckCardMenubar deckProperties={deck} refetchDecks={refetch} />,
                            })}
                        />
                    ))
                }
            </CardsListContentSection>
        </div>
    );

    function onCreateNewDeckModal(groupId: number) {
        return ModalBoxes.open({
            className: 'create-new-deck-modal',
            title: 'Create a new deck',
            component: <CreateNewDeckModal groupId={groupId} refetchDecks={refetch} />
        })
    }
};