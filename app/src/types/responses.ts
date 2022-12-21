import { ErrorSpec } from "$types/error";

export type ContentOrError<T> =
  | ({
    type: "success";
  } & T)
  | ({
    type: "error";
  } & ErrorSpec);
