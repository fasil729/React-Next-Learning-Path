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