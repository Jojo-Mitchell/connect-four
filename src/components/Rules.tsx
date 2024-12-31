import { useAppDispatch } from '../hooks';
import { setGameMode } from '../features/gameSlice';
import iconCheck from '../assets/icon-check.svg';

export default function Rules() {
  const dispatch = useAppDispatch();

  return (
    <section className="flex min-h-screen flex-col items-center mx-auto bg-primary-purple">
      <div className="rule-details text-black my-auto">
        <div className="group relative flex flex-col rounded-default justify-center mx-auto bg-white w-[480px] h-[537px] max-sm:w-[335px] max-sm:h-[583px] border-edge hover:border- px-8">
          <h1 className="text-6xl text-center uppercase font-bold mt-20 mb-4">Rules</h1>
          
          <h3 className="heading-small text-left uppercase font-semibold text-game-purple w-[412px]">Objective</h3>
          <p className="text-slate-500 font-medium my-2">
            Be the first player to connect 4 of the same colored discs in a row (either
            vertically, horizontally, or diagonally).
          </p>
          
          <h3 className="heading-small text-left uppercase font-semibold text-game-purple w-[412px] min-sm:w-[290px] py-2">How to Play</h3>
          <ol className="list-decimal font-medium [counter-increment:section] marker:[content:counters(section,'.')] pl-2 pb-4">
            <li className="pl-3 py-1">
              <p className="text-slate-500 [counter-increment:section] marker:[content:counters(section,'.')]">
                Red goes first in the first game.
              </p>
            </li>
            <li className="pl-3 py-1">
              <p className="text-slate-500 [counter-increment:section] marker:[content:counters(section,'.')]">
                Players must alternate turns, and only one disc can be dropped in each turn.
              </p>
            </li>
            <li className="pl-3 py-1">
              <p className="text-slate-500 [counter-increment:section] marker:[content:counters(section,'.')]">
                The game ends when there is a 4-in-a-row or a stalemate.
              </p>
            </li>
            <li className="pl-3 pt-1">
              <p className="text-slate-500">
                The starter of the previous game goes second on the next game.
              </p>
            </li>
          </ol>
          
          <button 
            onClick={() => dispatch(setGameMode('menu'))}
            className="mx-auto hover:no-underline hover:shadow-green bg-transparent border-none cursor-pointer"
          >
            <img
              src= {iconCheck}
              alt="Checkmark icon image"
              width={64}
              height={64}
            />
          </button>
        </div>
      </div>
    </section>
  );
}