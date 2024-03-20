import Image from "next/image";
import JobListCard from "./(components)/JobListCard";

const data = {
  imageUrl:
    "https://res.cloudinary.com/dmegiw31y/image/upload/v1710423619/a2sv/rt441m4pmc5ohdjnkmin.svg",
  title: "Social Media Assistant",
  subTitle: "Young Men Christians Association",
  address: "Addis Ababa, Ethiopia",
  description:
    "As a Social Media Assistant, you will work closely with the social media manager or marketing team to execute social media strategies and campaigns. You will be responsible for assisting in the creation and scheduling of engaging content, monitoring social media channels, and interacting with followers.",
  relatedTopics: ["In person", "Education", "IT"],
};

export default function Home() {
  return (
    <div className="bg-black min-h-screen flex justify-center items-center">
        <JobListCard props={data} />
    </div>
  );
}
