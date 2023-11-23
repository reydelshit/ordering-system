import { Button } from '@/components/ui/button';

export default function NotificationViewOrders({
  recepientName,
  recepeintProfilePicture,
  handleSetTemplateMessage,
}: {
  recepientName: string;
  recepeintProfilePicture: string;
  handleSetTemplateMessage: () => void;
}) {
  return (
    <div className="flex flex-row items-center h-[4rem] w-full justify-between">
      <div className="flex h-full items-center gap-4">
        <img
          className="w-[4rem] h-[4rem] object-cover rounded-full"
          src={recepeintProfilePicture}
          alt={recepientName}
        />
        <span className="font-bold text-1xl">{recepientName}</span>
      </div>

      {/* <Button onClick={handleSetTemplateMessage}>Use message template</Button> */}
    </div>
  );
}
