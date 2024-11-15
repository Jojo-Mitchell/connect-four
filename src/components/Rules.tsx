import { useAppDispatch } from '../hooks';
import { setGameMode } from '../features/gameSlice';
import iconCheck from '../assets/icon-check.svg';

export default function Rules() {
  const dispatch = useAppDispatch();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-primary-purple">
      <section className="rule-details text-black">
        <div className="group relative flex flex-col rounded-default justify-center mx-auto p-8 bg-white w-[480px] h-[537px] border-edge">
          <h1 className="text-6xl text-center uppercase font-bold mt-16 pb-4">Rules</h1>
          
          <h3 className="heading-small text-left uppercase font-semibold text-secondary-purple w-[412px]">Objective</h3>
          <p className="text-slate-700 font-medium my-3">
            Be the first player to connect 4 of the same colored discs in a row (either
            vertically, horizontally, or diagonally).
          </p>
          
          <h3 className="heading-small text-left uppercase font-semibold text-secondary-purple w-[412px] py-4">How to Play</h3>
          <ol className="list-decimal [counter-increment:section] marker:[content:counters(section,'.')] pl-2 pb-6">
            <li className="pl-4 py-1">
              <p className="text-slate-700 [counter-increment:section] marker:[content:counters(section,'.')]">
                Red goes first in the first game.
              </p>
            </li>
            <li className="pl-4 py-1">
              <p className="text-slate-700 [counter-increment:section] marker:[content:counters(section,'.')]">
                Players must alternate turns, and only one disc can be dropped in each turn.
              </p>
            </li>
            <li className="pl-4 py-1">
              <p className="text-slate-700 [counter-increment:section] marker:[content:counters(section,'.')]">
                The game ends when there is a 4-in-a-row or a stalemate.
              </p>
            </li>
            <li className="pl-4 py-1">
              <p className="text-slate-700">
                The starter of the previous game goes second on the next game.
              </p>
            </li>
          </ol>
          
          <button 
            onClick={() => dispatch(setGameMode('menu'))}
            className="mx-auto hover:border-transparent hover:no-underline hover:shadow-green bg-transparent border-none cursor-pointer"
          >
            <img
              src= {iconCheck}
              alt="Checkmark icon image"
              width={64}
              height={64}
            />
          </button>
        </div>
      </section>
    </main>
  );
}