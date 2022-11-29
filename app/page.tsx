import Head from "next/head";
import Image from "next/image";
import { Card } from "../components/Card";
import notion from "../utils/NotionClient";
import clsx from "clsx";

export default async function Home() {
  const data = await notion
    .getChildDatabases()
    .then((entries) =>
      entries.filter((entry) => entry.type === "child_database")
    );

  return (
    <div>
      <Head>
        <title>OSL Hub</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={clsx('px-4')}>
        <p>
          OSL Hub is a place where you can find all the resources you need to
          learn and grow as a developer.
        </p>
        <section className="px-4">
          {data.map((item, i) => (
            <Card>
              <p>{item.child_database.title}</p>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
