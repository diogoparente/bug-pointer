import { dateFormater } from "@/utils/utils";
import { Paragraph } from "../text";

interface DateDisplayProps {
  date: string;
  label: string;
}

const DateDisplay = ({ date, label }: DateDisplayProps) => {
  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <Paragraph>{label}</Paragraph>
      <Paragraph className="text-semibold">{dateFormater(date)}</Paragraph>
    </div>
  );
};

export { DateDisplay };
