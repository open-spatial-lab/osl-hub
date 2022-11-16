import type {
	PageObjectResponse,
	PartialPageObjectResponse
} from '@notionhq/client/build/src/api-endpoints';
import type { ErrorSpec } from 'src/types/error';
import type { ParentBreadcrumbSpec } from 'src/utils/NotionClient';

export type DatabaseResponse =
	| ({
			type: 'success';
	  } & {
			results: Array<PageObjectResponse | PartialPageObjectResponse>;
			parent: Array<ParentBreadcrumbSpec>
	  })
	| ({
			type: 'error';
	  } & ErrorSpec);

export type DisplaySchema = {
	title: string;
	id: string;
	properties: {[key:string]: any};
}