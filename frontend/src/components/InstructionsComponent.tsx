import Button from "./button";
import IdKit from "./id-kit";
export default function InstructionsComponent() {
  return (
    <div>
      <header>
        <h1>
          bug<span>thumb</span>
        </h1>
      </header>
      <div>
        <Button color="mainGreen">Teste</Button>
        <IdKit />
      </div>
    </div>
  );
}
