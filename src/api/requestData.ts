export type IRequestData = {
  _id: {
    $oid: string;
  };
  targetURL: string;
  statusCode: string;
  timestamp: {
    $date: string;
  };
  eventType: string;
  httpDuration: string;
  dnsDuration: string;
  params: string;
  responseData: string;
  is_error: boolean;
};
