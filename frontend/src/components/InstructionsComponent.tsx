import Button from "./button";
import IdKit from "./id-kit";
import Tag from "./tag";
export default function InstructionsComponent() {
  return (
    <div>
      <header>
        <h1>
          bug<span>thumb</span>
        </h1>
      </header>
      <div>
        <Button color="purple">I&apos;m a Sponsor</Button>
        <Button color="green">I&apos;m an Hacker</Button>
        <Button color="gradient">I&apos;m an Hacker</Button>
        <Tag color="red">I&apos;m a Tag</Tag>
        <Tag color="orange">I&apos;m a Tag</Tag>
        <Tag color="yellow">I&apos;m a Tag</Tag>
        <Tag color="green">I&apos;m a Tag</Tag>
        <Tag color="grey">I&apos;m a Tag</Tag>
        <Tag color="purple">I&apos;m a Tag</Tag>
        <IdKit />
      </div>
    </div>
  );
}
