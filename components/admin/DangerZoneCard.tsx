import { Button } from '../ui/button';

export default function DangerZoneCard({
  optionTitle,
  optionDesc,
  onClick,
}: {
  optionTitle: string;
  optionDesc: string;
  onClick?: () => Promise<void>;
}) {
  return (
    <div className="sm:flex space-x-0 sm:space-x-4 space-y-4 md:space-y-0 justify-between items-center p-5  border-b border-white border-opacity-10 last:border-b-0">
      <div>
        <p className="text-lg font-semibold">{optionTitle}</p>
        <p className="text-sm font-light">{optionDesc}</p>
      </div>
      <Button
        onClick={onClick}
        type="button"
        className="hover:text-white hover:bg-red-500 bg-transparent text-red-500 border border-red-500 p-4 rounded-full text-base"
      >
        {optionTitle}
      </Button>
    </div>
  );
}
