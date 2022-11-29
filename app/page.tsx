import * as Card from "../components/Card";
import notion from "../utils/NotionClient";
import clsx from "clsx";
import { CardGrid } from "../components/CardGrid";
import Link from "next/link";

export default async function Home() {
  const data = await notion
    .getChildDatabases()
    .then((entries) =>
      entries.filter((entry) => entry.type === "child_database")
    );

  return (
    <div>
      <main className={clsx("px-4")}>
        <p>
          OSL Hub is a place where you can find all the resources you need to
          learn and grow as a developer.
        </p>
        <section className="">
          <CardGrid>
            {data.map((item, i) =>
              "child_database" in item ? (
                <Card.Wrapper key={item.child_database.title + i}>
                  <Link href={`/db/${item.id}`}>
                    <Card.Header>{item.child_database.title}</Card.Header>
                    <p className="py-2 text-center font-italic">Read More</p>
                  </Link>
                </Card.Wrapper>
              ) : null
            )}
          </CardGrid>
        </section>
      </main>
    </div>
  );
}
