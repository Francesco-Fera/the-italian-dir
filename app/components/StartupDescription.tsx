import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Category, Startup } from "@prisma/client";

interface StartupDescriptionProps {
  startup: Partial<Startup & Category>;
}

export function StartupDescription({ startup }: StartupDescriptionProps) {
  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>About {startup.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-gray-700 dark:text-gray-300'>
            {startup.description}
          </p>
        </CardContent>
      </Card>
      {startup.features && startup.features.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className=''>
              {startup.features.map((feature, index) => (
                <li key={index} className='text-gray-700 dark:text-gray-300'>
                  ✅ {feature}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
