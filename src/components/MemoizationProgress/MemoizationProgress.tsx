import {Progress} from "@/components/ui/progress.tsx";
import './MemoizationProgress.scss';

type Props = {
    currentIndex: number,
    cardsTotal: number,
}

export default function MemoizationProgress({ currentIndex, cardsTotal }: Props) {
    return (
        <div className="memoization-page-progress">
            <Progress value={Math.round((100 / cardsTotal) * currentIndex)} className="memoization-page-progress-item" />
            <div className="memoization-page-progress-status">{currentIndex}/{cardsTotal}</div>
        </div>
    );
}