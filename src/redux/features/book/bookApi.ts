import { IBook } from "../../../types/globalTypes";
import { api } from "../../api/apiSlice";

export interface GetBooksResponse {
  data: IBook[]; // The actual response should have a property named 'data' containing an array of books
}
export const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //home 10books
    getHomeBooks: builder.query<GetBooksResponse, void>({
      query: () => "/books/"
    }),
    singleBooksDetails: builder.query({
      query: (id) => `/books/${id}`
    }),
    //all books and search and filter query

    getAllBooks: builder.query<GetBooksResponse, void>({
      query: () => "/books/all-books"
    }),
    getSearchBooks: builder.query<GetBooksResponse, string>({
      query: (query) => `/books/all-books?searchTerm=${query}`
    }),
    getFilterBooks: builder.query<
      GetBooksResponse,
      { genre?: string | undefined; publicationDate?: string | undefined }
    >({
      query: ({ genre, publicationDate }) => {
        if (genre && publicationDate) {
          return `/books/all-books?genre=${genre}&publicationDate=${publicationDate}`;
        } else if (genre) {
          console.log(genre, "Genre");
          return `/books/all-books?genre=${genre}`;
        } else {
          return `/books/all-books?publicationDate=${publicationDate}`;
        }
      }
    }),
    postComment: builder.mutation({
      query: ({ id, data, token }) => ({
        url: `/books/review/${id}`,
        method: "POST",
        headers: {
          Authorization: token
        },
        body: data
      }),
      invalidatesTags: ["comments"],
    }),
    getComment: builder.query({
      query: (id) => `/books/review/${id}`,
      providesTags: ["comments"]
    }),
    postEditBook: builder.mutation({
      query: ({id, data, token}) => ({
        url: `/books/editBook/${id}`,
        method: "PATCH",
        headers: {
          Authorization: token
        },
        body: data
      }),
    }),
    postDeleteBook: builder.mutation({
      query: ({id, token}) => ({
        url: `/books/bookDetails/${id}`,
        method: "DELETE",
        headers: {
          Authorization: token
        },
      }),
    }),
    addBookPost: builder.mutation({
      query: ({data, token}) => ({
        url: `/books/add-new-book`,
        method: "POST",
        headers: {
          Authorization: token
        },
        body: data
      }),
    }),
  })
});

export const {
  useGetHomeBooksQuery,
  useGetSearchBooksQuery,
  useGetAllBooksQuery,
  useGetFilterBooksQuery,
  useSingleBooksDetailsQuery,
  useGetCommentQuery,
  usePostCommentMutation,
  usePostDeleteBookMutation,
  useAddBookPostMutation,
  useEditBookPostMutation,
} = bookApi;
