import Head from "next/head";
import Image from "next/image";
import { Card } from "../components/Card";
import notion from "../utils/NotionClient";
import clsx from "clsx";
import { CardGrid } from "../components/CardGrid";

export default async function Home() {
  const data = await notion
    .getChildDatabases()
    .then((entries) =>
      entries.filter((entry) => entry.type === "child_database")
    );

  return (
    <div>

      <main className={clsx('px-4')}>
        <p>
          OSL Hub is a place where you can find all the resources you need to
          learn and grow as a developer.
        </p>
        <section className="">
          <CardGrid>
          {data.map((item, i) => (
            "child_database" in item ? <Card key={item.child_database.title + i}>
              <p>{item.child_database.title}</p>
            </Card> : null
          ))}
          </CardGrid>
        </section>
      </main>
    </div>
  );
}
