import truncate from 'ansi-truncate';
import { Button } from './ui/button';
import { IconParkOutlineLike, MingcuteComment2Fill } from './Icons';

export default function PostBox() {
  return (
    <div className="space-y-4 border-t-[1px] border-[#948b96] border-opacity-30 mt-4 pt-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div
            className="bg-cover rounded-full w-[50px] h-[50px]"
            style={{
              backgroundImage:
                'url(http://150.230.141.111/storage/v1/object/public/user_assets/53a9627c-ddcc-49cd-a54d-a9b634aaaee7/avatar.png?t=2024-06-06T10:06:44.294Z)',
            }}
          ></div>
          <div>
            <p>Gizem</p>
            <p className="text-xs text-[#948b96]">e/Foundry</p>
          </div>
        </div>
        <p className="text-sm text-[#948b96]">1 hour ago</p>
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-xl">
          One of my friends posted a dead body and idk how to cope with what I
          saw
        </p>
        <p className="font-extralight">
          {truncate(
            `Final edit: I appreciate the comments I got on this but it's getting
          overwhelming now and I don't really want to think of the post I saw
          tbh? Ty to everyone who gave helpful tips of any kind, I don't plan to
          reply to any more though. So just a warning bc this is graphic
          Basically my friend shared an awareness post about the current tragedy
          in the middle east, and it was an image of a young boy who'd been
          beheaded It was like, a toddler, I think the post said 18 months It
          was posted last night to their Instagram story with no warning and no
          censorship, just a decapitated child. I didn't sleep well last night
          and idk how to cope with what I saw. I've seen a lot of pics like
          these but not usually of children. I plan to seek therapy soon, but in
          the meantime I just need advice on how to start to process some of
          this Ok quick edit: For those of you saying to report the post, I'd
          definitely like to, I just don't know if I can handle seeing the image
          again, not for a while at least.`,
            700,
          )}
        </p>
      </div>
      <div className="flex space-x-2">
        <Button
          type="button"
          className="inline-flex px-3 items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-fit py-1.5 text-[#212325] rounded-full bg-clip-padding backdrop-filter text-base bg-white backdrop-blur-sm bg-opacity-70 border border-opacity-10 border-gray-100"
        >
          <MingcuteComment2Fill className="text-xl" />
          <p className="px-1">374</p>
        </Button>
        <Button
          type="button"
          className="inline-flex px-3 items-center justify-center hover:bg-red-400 hover:text-[#212325] h-fit py-1.5 text-red-400 rounded-full text-base bg-transparent backdrop-blur-sm border-2 border-red-400"
        >
          <IconParkOutlineLike className="text-xl" />
          <p className="px-1">374</p>
        </Button>
      </div>
    </div>
  );
}
