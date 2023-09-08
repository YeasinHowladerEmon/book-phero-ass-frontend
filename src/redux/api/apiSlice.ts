import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-server-emonibnsalim-gmailcom.vercel.app/api/v1"
  }),
  tagTypes: ["comments"],
  endpoints: () => ({})
});
