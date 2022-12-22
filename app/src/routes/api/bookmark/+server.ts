import { json } from "@sveltejs/kit";
import type { RequestHandler } from './$types';
import {bookmarkActions, backendActions} from './bookmarkActions'

export const GET: RequestHandler = ({locals, url}) => {
    const params = url.searchParams;
    const [action, contentId] = [params.get("action"), params.get("contentId")];

    if (!action || !backendActions.includes(action!)) {
        return json({ error: "Invalid action", type: "error" }, { status: 400 });
      }
    if (!contentId) {
        return json({ error: "Invalid contentId", type: "error" }, { status: 400 });
    }

    return bookmarkActions(
        locals,
        action,
        contentId
    )
}