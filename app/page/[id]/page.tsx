import clsx from "clsx";
import Link from "next/link";
import { CardGrid } from "../../../components/CardGrid";
import * as Card from "../../../components/Card";
import notion from "../../../utils/NotionClient";
import { BreadCrumbs } from "../../../components/BreadCrumbs.tsx";
import { parseRelations } from "../../../utils/parseRelations";
import { NotionBlocks } from "../../../components/NotionBlocks";

interface DbPageProps {
  params: {
    id: string;
  };
}

export default async function DbPage({ params }: DbPageProps) {
  //   const router = useRouter()
  const { id } = params;

  const { parent, page, content } = await notion.getPageContent(id);
  const title = parent?.length ? parent[parent.length - 1].name : "Home";
  const relations = parseRelations(page)

  return (
    <div>
      <main className={clsx("px-4")}>
        <h1>{title}</h1>
        <BreadCrumbs steps={parent} />
        <article className="">
          <NotionBlocks blocks={content.results} />
        </article>
      </main>
    </div>
  );
}
