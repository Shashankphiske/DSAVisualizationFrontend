import { Clock, Database, Shield } from "lucide-react";

const ComplexityBadges = ({ time, space, stable }) => (
  <div className="flex flex-wrap gap-2">
    {time && (
      <span className="badge badge-time">
        <Clock size={12} /> Time {time}
      </span>
    )}
    {space && (
      <span className="badge badge-space">
        <Database size={12} /> Space {space}
      </span>
    )}
    {stable && (
      <span className="badge badge-stable">
        <Shield size={12} /> {stable}
      </span>
    )}
  </div>
);

export default ComplexityBadges;
