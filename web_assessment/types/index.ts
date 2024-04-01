type HospitalData = {
  _id: string;
  address: {
    region: string;
    woreda: string;
    zone: string;
    summary: string;
  };
  phoneNumbers: string[];
  emails: string[];
  Photo: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  institutionName: string;
  status: string;
};


interface HospitalListResponse {
  success: boolean;
  message: string;
  totalCount: number;
  data: HospitalData[];
}