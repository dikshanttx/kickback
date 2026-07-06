'use client';

const items = [
  { question: 'Does this use a backend?', answer: 'No. Everything runs locally in the browser.' },
  { question: 'What file types are supported?', answer: 'PDF, DOCX, and TXT are supported for upload and parsing.' },
  { question: 'Can I use it on my phone?', answer: 'Yes. The interface is responsive across desktop, tablet, and mobile.' }
];

export default function FAQPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">FAQ</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Helpful answers for a quick start.</h1>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.question} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold text-white">{item.question}</h2>
            <p className="mt-2 text-sm text-slate-400">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
