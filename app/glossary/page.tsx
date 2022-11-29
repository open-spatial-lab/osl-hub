import clsx from "clsx";
import notion from "../../utils/NotionClient";
import Link from "next/link";

export default async function IndexPage() {
  const data = await notion.getFullIndex();
  let letters = data.map(d => d?.properties?.Name?.title?.[0]?.text?.content?.slice(0,1)).filter(Boolean).filter(onlyUnique)
  
  return (
    <div>
      <main className={clsx("px-4")}>
        <section className="">
          {data.map((d) => {
            const title = d?.properties?.Name?.title?.[0]?.text?.content
            const firstLetter = title && title.slice(0,1)
            return <>
            {firstLetter?.localeCompare(letters[0]) >= 0 && <h1>{letters.shift()}</h1>}
            <Link href={`/page/${d.id}`}>
              <p>{title}</p>
            </Link>
            </>
    })}
        </section>
      </main>
    </div>
  );
}

function onlyUnique(value: any, index: number, self: Array<any>) {
  return self.indexOf(value) === index;
}