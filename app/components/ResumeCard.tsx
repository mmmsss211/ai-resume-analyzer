import { Link } from "react-router"
import type { Resume } from "types"

const ResumeCard = ({ resume: {id, companyName, jobTitle } }: { resume: Resume }) => {
    return (
        <Link to={`/resume/${id}`} >
            <div className="bg-white p-4 rounded-md border border-emerald-100 transition-all hover:border-emerald-500">
                <h1 className="text-lg font-semibold text-emerald-900">{companyName}</h1>
                <p className="text-sm text-gray-400">{jobTitle}</p>
            </div>
        </Link>
    )
}
export default ResumeCard