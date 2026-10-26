// Banner for pages whose wording or figures still need the owner's (or a lawyer's) confirmation.
export default function DraftNotice({ children }: { children: React.ReactNode }) {
  return (
    <p role="note" className="mt-6 rounded-lg border border-gold/40 bg-gold/10 px-4 py-3 text-step--1 text-ink">
      <strong className="font-bold">To be confirmed: </strong>
      {children}
    </p>
  );
}
