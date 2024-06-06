import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// TODO: Implement avatar and user profile caching!!!
export default function MessageContent({
  id,
  author,
  body,
  timestamp,
}: {
  id: number;
  author: string;
  body: string;
  timestamp: string;
}) {
  return (
    <div className="flex space-x-4 mb-5 mr-5">
      <Avatar>
        <AvatarImage src="http://150.230.141.111/storage/v1/object/public/user_assets/53a9627c-ddcc-49cd-a54d-a9b634aaaee7/avatar.png?t=2024-06-05T08:00:52.135Z"></AvatarImage>
        <AvatarFallback>{author.slice(0, 3).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center space-x-2">
          <p className="font-semibold">{author}</p>
          <p className="text-xs text-[#948b96]">{timestamp}</p> 
        </div>
        <p className="font-light text-sm">
          {body}
        </p>
      </div>
    </div>
  );
}
