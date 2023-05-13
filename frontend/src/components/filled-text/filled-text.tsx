import { Paragraph, SubHeader } from "../text";

type FilledTextProps = {
  label: string;
  text: string;
};

const FilledText = ({ label, text }: FilledTextProps) => (
  <div className="flex flex-col items-start justify-start gap-2">
    <SubHeader>{label}</SubHeader>
    <Paragraph>{text}</Paragraph>
  </div>
);

export { FilledText };
