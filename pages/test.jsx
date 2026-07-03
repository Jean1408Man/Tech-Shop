import TitleTab from "../components/ui/TitleTab";

export default function TestPage() {
  return (
    <div className="grid place-items-center gap-4 h-[720px] min-h-0">
      <section className="w-full max-w-[1856px] h-[512px] mx-auto relative overflow-hidden py-8 border-t-2 border-primary-dark">
        <TitleTab>Ofertas tendencia</TitleTab>
      </section>
      <div />
    </div>
  );
}
