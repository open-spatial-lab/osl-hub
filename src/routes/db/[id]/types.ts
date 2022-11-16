import type {
	PageObjectResponse,
	PartialPageObjectResponse
} from '@notionhq/client/build/src/api-endpoints';
import type { ErrorSpec } from 'src/types/error';

export type DatabaseResponse =
	| ({
			type: 'success';
	  } & {
			results: Array<PageObjectResponse | PartialPageObjectResponse>;
	  })
	| ({
			type: 'error';
	  } & ErrorSpec);
