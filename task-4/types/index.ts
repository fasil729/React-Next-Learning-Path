interface JoblistProps {
    imageUrl: string;
    title: string;
    subTitle: string;
    address: string;
    description: string;
    relatedTopics: string[]
    
  }

type DataItem = {
    text: any;
    icon: React.JSX.Element;
  };

interface OpportunityDetail {

  count: number;
data: Opportunity;
errors: any;
message: string;
success: boolean;
}

interface OpportunityList {
  
count: number;
data: Opportunity[];
errors: any;
message: string;
success: boolean;
}

interface Opportunity {
    id: string;
    title: string;
    description: string;
    responsibilities: string;
    requirements: string;
    idealCandidate: string;
    categories: string[];
    opType: "virtual" | "physical";
    startDate: string;
    endDate: string;
    deadline: string;
    location: string[];
    requiredSkills: string[];
    whenAndWhere: string;
    orgID: string;
    datePosted: string;
    status: "open" | "closed";
    applicantsCount: number;
    viewsCount: number;
    orgName: string;
    logoUrl: string;
    isBookmarked: boolean;
    isRolling: boolean;
    questions: any;
    perksAndBenefits: any;
    createdAt: string;
    updatedAt: string;
    orgEmail: string;
  }

  interface SignupRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
  }
  
  interface VerifyEmailRequest {
    Email: string;
    OTP: string;
  }
  
  interface User {
    accessToken: string;
    refreshToken: string;
    name: string;
    email: string;
    profilePicUrl: string;
    role: string;
    profileComplete: boolean;
    profileStatus: string;
  }
  
  interface VerifyEmailResponse {
    data: User;
    success: boolean;
    message: string;
    errors: null;
    count: number;
  }