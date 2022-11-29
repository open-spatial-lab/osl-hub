import type { FooterColumn } from "./types";
import styles from "./Footer.module.css";
import clsx from "clsx";

const NavColumn: FooterColumn = [
  {
    header: "Open Spatial Lab Hub",
  },
  {
    text: "Home",
    link: "/",
  },
  {
    text: "About",
    link: "/about",
  },
  {
    text: "Contact",
    link: "/contact",
  },
  {
    text: "Github",
    link: "https://github.com/open-spatial-lab",
  },
];
const UChicagoColumn: FooterColumn = [
  {
    header: "University of Chicago",
  },
  {
    link: "https://datascience.uchicago.edu/",
    image: "/img/dsi.png",
    text: "The Data Sceince Institute",
  },
  {
    image: "/img/csds.png",
    text: "The Center for Spatial Data Science",
    link: "https://spatial.uchicago.edu/",
  },
];
const AcknowledgementsColumn: FooterColumn = [
  {
    header: "Acknowledgements",
  },
  {
    image: "/img/rwjf.jpeg",
    text: "The Robert Wood Johnson Foundation",
    link: "https://www.rwjf.org/",
  },
  {
    text: "Support for the Open Spatial Lab is provided in part by the Robert Wood Johnson Foundation",
  },
];

export function Footer() {
  return (
    <footer className={clsx("container", styles.footer)}>
      <div className="row">
        {[NavColumn, UChicagoColumn, AcknowledgementsColumn].map(
          (column, i) => (
            <div className="col-sm-12 col-md-4 py-4" key={i}>
              {column.map((item, i) => (
                <div key={i} className="py-2">
                  {item.header && <h3>{item.header}</h3>}
                  {item.image && item.link ? (
                    <a href={item.link} target="_blank" rel="noreferrer" className="pb-2 pt-4">
                      <img src={item.image} alt={item.text} />
                    </a>
                  ) : item.image ? (
                    <img src={item.image} alt={item.text} />
                  ) : item.link ? (
                    <a href={item.link}>{item.text || item.link}</a>
                  ) : item.text ? (
                    <p>{item.text}</p>
                  ) : null}
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </footer>
  );
}
