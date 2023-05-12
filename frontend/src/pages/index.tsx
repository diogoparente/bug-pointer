import InstructionsComponent from "../components/InstructionsComponent";

export default function Home() {
  return (
    <div>
      <main className={"flex flex-1 flex-col items-center justify-center p-8"}>
        <InstructionsComponent />
      </main>
    </div>
  );
}
