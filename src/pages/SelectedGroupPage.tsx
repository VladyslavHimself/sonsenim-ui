import {useLocation, useNavigate, useParams} from "react-router-dom";
import '@/styles/layout-wrapper.styles.scss';
import {Input} from "@/components/ui/input.tsx";
import PageHeaderSection from "@/components/Dashboard/DashboardHeaderSection/PageHeaderSection.tsx";
import {ListFilter} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import CardsListContentSection from "@/components/Groups/GroupsListContentSection/CardsListContentSection.tsx";
import useAggregatedDecks from "@/api/decks/useAggregatedDecks.ts";
import Card from "@/components/Card/Card.tsx";
import ModalBoxes from "@/ModalBoxes/ModalBoxes.tsx";
import DeckCardMenubar from "@/components/DeckCardMenubar/DeckCardMenubar.tsx";
import CreateNewDeckModal from "@/components/Modals/DeckModals/CreateNewDeckModal.tsx";
import {useMemo, useState} from "react";


// TODO: Avoid duplications by making some useQuicksearch hook or e.t.c
export default function SelectedGroupPage() {
    const { groupId } = useParams();
    const { aggregatedDecks, refetch } = useAggregatedDecks(groupId!);
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const filteredDecks = useMemo(() => {
        if (searchInput && aggregatedDecks) {
            return aggregatedDecks.filter((deck) =>
                deck.deckName.toLowerCase().includes(searchInput.toLowerCase()));
        }

        return aggregatedDecks;
    }, [aggregatedDecks, searchInput]);

    return (
        <div className="layout-wrapper">
            <PageHeaderSection>
                <div className="groups-header-section">
                    <Input
                           placeholder="Search"
                           className="groups-header-input"
                           value={searchInput}
                           onChange={(e) => {
                               setSearchInput(e.target?.value)}}
                    />
                    <Button variant="outline" className="groups-header-button"><ListFilter/></Button>
                </div>
            </PageHeaderSection>

            <CardsListContentSection Header={() => (
                <>
                    <h1>{location.state.groupName}</h1>
                    <Button style={{padding: "25px 30px"}} onClick={() => onCreateNewDeckModal(+groupId!)}>+ Create a
                        new deck</Button>
                </>
            )}>
                {
                    // TODO: Add template (design), if user haven't any decks here
                    filteredDecks?.map((deck) => (
                        <Card
                            key={groupId}
                            cardTitle={deck.deckName}
                            notificationMessage={deck?.dueCardsInDeck}
                            secondaryTile={<div>{`${deck.cardsInDeckTotal} cards`}</div>}
                            onClickHandler={() => ModalBoxes.open({
                                className: 'deck-menubar',
                                component: <DeckCardMenubar
                                    navigate={navigate}
                                    deckProperties={deck}
                                    groupId={groupId!}
                                    refetchDecks={refetch}
                                />,
                                onClose: () => {}
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
            component: <CreateNewDeckModal groupId={groupId} refetchDecks={refetch} />,
            onClose: () => {}
        })
    }
};