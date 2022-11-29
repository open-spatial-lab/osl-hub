import { BreadCrumbsProps } from "./types";
import styles from './BreadCrumbs.module.css'
import Link from "next/link";
import * as Separator from '@radix-ui/react-separator';
import { ParentBreadcrumbSpec } from "../../utils/NotionClient";

export function BreadCrumbs({
    showHome=true,
    steps
}: BreadCrumbsProps) {
  return <div className="d-flex">
    {showHome && <BreadCrumbStep step={{type:null, id:"", name: "Home"}} />}
    {steps.map((step, i) => <BreadCrumbStep key={i} step={step} />)}
  </div>;
}

function BreadCrumbStep({
    step
}: {step: ParentBreadcrumbSpec}){
    const {type, id, name} = step;
    const url = type && id ? `/${type}/${id}` : "/"
    return <div className="d-flex">
        <Link href={url}>{name}</Link>
        <hr className="vr mx-2"/>
    </div>
}