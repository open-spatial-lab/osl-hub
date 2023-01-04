import { json } from "@sveltejs/kit";
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({params, url}) => {
    const {contentId} = params;
    

    return json({ error: "Invalid contentId", type: "error" }, { status: 400 });
}