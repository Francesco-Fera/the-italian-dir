import { Startup } from "@prisma/client";
import MyStartupCard from "./MyStartupCard";

interface MyStartupListProps {
  startups: Partial<Startup>[];
}

function MyStartupList({ startups }: MyStartupListProps) {
  return (
    <div>
      {startups.map((startup) => (
        <MyStartupCard key={startup.id} startup={startup} />
      ))}
    </div>
  );
}

export default MyStartupList;
