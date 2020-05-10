export interface IOfferState {
  userOffers: Array<any>;
  offersMatches: Array<any>;
  offerDetails: any;
  offerRides: Array<any>;
  loader: boolean;
  searchSuccess: boolean;
  error: boolean;
  errorInfo: string;
  response: string;
}
