import type { Actions } from './$types';
import {bookmarkActions} from './bookmarkActions'

export const actions: Actions = {
    
    default: async ({request, locals}) => {
        const action = "toggleBookmark"
        const data = await request.formData();
        const contentId = data.get('contentId')
        const result = await bookmarkActions(locals, action, contentId)
        const responseData = await result.json()
        return responseData.isBookmarked
    }
  };