export interface TypeFetchResult {
  count: number;
  next: any;
  previous: any;
  results: [
    {
      name: string;
      url: string;
    }
  ];
}
