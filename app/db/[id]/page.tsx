import clsx from "clsx";
import Link from "next/link";
import { CardGrid } from "../../../components/CardGrid";
import * as Card from "../../../components/Card";
import notion from "../../../utils/NotionClient";
import { BreadCrumbs } from "../../../components/BreadCrumbs.tsx";
import { parseRelations } from "../../../utils/parseRelations";

interface DbPageProps {
  params: {
    id: string;
  };
}

export default async function DbPage({ params }: DbPageProps) {
  //   const router = useRouter()
  const { id } = params;

  const { results, parent } = await notion.getDatabase(id);
  const title = parent?.length ? parent[parent.length - 1].name : "Home";
  
  return (
    <div>
      <main className={clsx("px-4")}>
        <h1>{title}</h1>
        <BreadCrumbs steps={parent} />
        <section className="">
          <CardGrid>
            {results.map((item, i) => (
              <Card.Wrapper key={item.id}>
                  <Card.Header>
                    {/* @ts-ignore */}
                    {item?.properties?.Name?.title?.[0]?.plain_text ||
                      "Hub Entry"}
                  </Card.Header>
                  <p className="p-3">
                      {/* @ts-ignore */}
                    {item?.properties?.['Short Description']?.rich_text?.[0]?.plain_text || ""}
                  </p>
                <Link href={`/page/${item.id}`}>
                  <p className="py-2 text-center font-italic">Read More</p>
                </Link>
              </Card.Wrapper>
            ))}
          </CardGrid>
        </section>
      </main>
    </div>
  );
}
