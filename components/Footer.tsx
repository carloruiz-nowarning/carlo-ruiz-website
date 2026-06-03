export default function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12 lg:px-20 bg-[#111111] border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-serif text-white/30 text-sm">Carlo Ruiz-Goldstein</span>
        <span className="font-sans text-white/20 text-xs">
          {new Date().getFullYear()} · Built to get hired.
        </span>
      </div>
    </footer>
  );
}
