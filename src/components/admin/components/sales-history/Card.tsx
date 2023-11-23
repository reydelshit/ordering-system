import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function CardCompo({
  title,
  description,
  icon,
  value,
}: {
  title: string;
  description: string;
  icon: any;
  value: string;
}) {
  return (
    <>
      <Card className="text-start bg-white w-full text-[#5d383a]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </>
  );
}
