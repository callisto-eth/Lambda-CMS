import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function MessageContent() {
  return (
    <div className="flex space-x-4 mb-5 mr-5">
      <Avatar>
        <AvatarImage src="http://150.230.141.111/storage/v1/object/public/user_assets/53a9627c-ddcc-49cd-a54d-a9b634aaaee7/avatar.png?t=2024-06-05T08:00:52.135Z"></AvatarImage>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center space-x-2">
          <p className="font-semibold">Vishal</p>
          <p className="text-xs text-[#948b96]">Today at 15:30</p>
        </div>
        <p className="font-light text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
}
