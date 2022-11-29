import { ParentBreadcrumbSpec } from "../../utils/NotionClient";

export interface BreadCrumbsProps {
    showHome?: boolean;
    steps: ParentBreadcrumbSpec[];
}