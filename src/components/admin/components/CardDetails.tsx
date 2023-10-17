interface MyComponentProps {
  children: React.ReactNode;
}

const CardDetails: React.FC<MyComponentProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-start border-2 w-[20rem] h-full justify-center p-2 rounded-md">
      {children}
    </div>
  );
};

export default CardDetails;
