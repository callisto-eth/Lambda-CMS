import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

type JoinFreeEventSchema = {
	id: string;
};

export async function POST(req: NextRequest) {
	const data: JoinFreeEventSchema = await req.json();
	const supabase = createClient();
	const user = await supabase.auth.getUser();

	let { data: joinEventResponse, error } = await supabase
		.schema("connections")
		.from("event_attendees")
		.insert({
			event: data.id,
			attendee: user.data.user?.id,
			role: "PARTICIPANT",
		});
}
