import redCounter from '../assets/counter-red-large.svg';
import yellowCounter from '../assets/counter-yellow-large.svg';

interface SlotProps {
  value: number | null;
  column: number;
  onSlotClick: (column: number) => void;
}

const Slot = ({ value, column, onSlotClick }: SlotProps) => {
  return (
    <button
      onClick={() => onSlotClick(column)}
      className="slot"
    >
      {value && (
        <img
          src={value === 1 ? redCounter : yellowCounter}
          alt={`Player ${value} marker`}
          className="w-full object-contain"
        />
      )}
    </button>
  );
};

export default Slot;