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