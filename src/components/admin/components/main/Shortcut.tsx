import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';

import { Link } from 'react-router-dom';

export default function Shortcut() {
  return (
    <Command className="h-[25rem] w-full ">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <Link to="/admin/orders">
            <CommandItem className="cursor-pointer ">Veiw Orders</CommandItem>
          </Link>
          <Link to="/admin/feedbacks">
            <CommandItem className="cursor-pointer">View Feedbacks</CommandItem>
          </Link>

          <Link to="/admin/customer-user">
            <CommandItem className="cursor-pointer">Veiw Customers</CommandItem>
          </Link>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Functions">
          <Link to="/admin/manage-product">
            <CommandItem className="cursor-pointer">Add product</CommandItem>
          </Link>
          <Link to="/admin/manage-product">
            <CommandItem className="cursor-pointer">Delete Product</CommandItem>
          </Link>

          <Link to="/admin/orders">
            <CommandItem className="cursor-pointer">Manage Orders</CommandItem>
          </Link>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
