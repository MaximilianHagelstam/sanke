import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
};

export const ErrorPage = ({
  title,
  description,
  buttonText,
  onClick,
}: ErrorPageProps) => {
  return (
    <div className="flex flex-col items-center gap-4 pt-8 text-center">
      <h1 className="font-heading text-7xl">{title}</h1>
      <p className="text-xl text-gray-500 dark:text-gray-400">{description}</p>
      <Button size="lg" onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  );
};
