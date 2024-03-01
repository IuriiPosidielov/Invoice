import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    drfTokenCreate: build.mutation<
      DrfTokenCreateApiResponse,
      DrfTokenCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/drf/token/`,
        method: "POST",
        body: queryArg.authToken,
      }),
    }),
    jwtTokenCreate: build.mutation<
      JwtTokenCreateApiResponse,
      JwtTokenCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/jwt/token/`,
        method: "POST",
        body: queryArg.tokenObtainPair,
      }),
    }),
    jwtTokenRefreshCreate: build.mutation<
      JwtTokenRefreshCreateApiResponse,
      JwtTokenRefreshCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/jwt/token/refresh/`,
        method: "POST",
        body: queryArg.tokenRefresh,
      }),
    }),
    InvoiceRetrieve: build.query<
      InvoiceRetrieveApiResponse,
      InvoiceRetrieveApiArg
    >({
      query: () => ({ url: `/api/invoice/` }),
    }),
    InvoiceCreate: build.mutation<
      InvoiceCreateApiResponse,
      InvoiceCreateApiArg
    >({
      query: (queryArg) => ({ url: `/api/invoice/`, method: "POST", body: queryArg.data }),
    }),
    InvoiceUpdate: build.mutation<
      InvoiceUpdateApiResponse,
      InvoiceUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/invoice/${queryArg.var}`,
        method: "PUT",
	body: queryArg.data
      }),
    }),
    InvoiceDestroy: build.mutation<
      InvoiceDestroyApiResponse,
      InvoiceDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/invoice/${queryArg.var}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as InvoiceApi };
export type DrfTokenCreateApiResponse = /** status 200  */ AuthToken;
export type DrfTokenCreateApiArg = {
  authToken: AuthToken;
};
export type JwtTokenCreateApiResponse = /** status 200  */ TokenObtainPair;
export type JwtTokenCreateApiArg = {
  tokenObtainPair: TokenObtainPair;
};
export type JwtTokenRefreshCreateApiResponse = /** status 200  */ TokenRefresh;
export type JwtTokenRefreshCreateApiArg = {
  tokenRefresh: TokenRefresh;
};
export type InvoiceRetrieveApiResponse = unknown;
export type InvoiceRetrieveApiArg = void;
export type InvoiceCreateApiResponse = unknown;
export type InvoiceCreateApiArg = {
	data: InvoiceData;
};

export type InvoiceData = {
	Question: string;
	Answer: string;
  Nr: string;
	Buyer: string;
	IssueDate: string;
	SaleDate: string;
	PaymentMethod: string;
	Description: string;
	Currency: string;
	CurrencyRate: string;
	InvoicePosition: string;
}

export type InvoiceUpdateApiResponse = unknown;
export type InvoiceUpdateApiArg = {
  var: string;
  data: InvoiceData;
};
export type InvoiceDestroyApiResponse = unknown;
export type InvoiceDestroyApiArg = {
  var: string;
};
export type AuthToken = {
  username: string;
  password: string;
  token: string;
};
export type TokenObtainPair = {
  username: string;
  password: string;
  access: string;
  refresh: string;
};
export type TokenRefresh = {
  access: string;
  refresh: string;
};

export type CreatePair = {
	Question: string;
	Answer: string;
};

export const {
  useDrfTokenCreateMutation,
  useJwtTokenCreateMutation,
  useJwtTokenRefreshCreateMutation,
  useInvoiceRetrieveQuery,
  useInvoiceCreateMutation,
  useInvoiceUpdateMutation,
  useInvoiceDestroyMutation,
} = injectedRtkApi;
