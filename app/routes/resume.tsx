import { useParams } from "react-router";

export const meta = () => [
  { title: "Resiomai | Review" },
  { name: "description", content: "View your resume analysis" },
];

const Resume = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <header>resume {id}</header>
    </div>
  );
};

export default Resume;
