import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

type CreateEventSchema = {
	name: string;
	description: string;
	entry_price: string;
	start_time: EpochTimeStamp;
	end_time: EpochTimeStamp;
	spaces_enabled: boolean;
	chat_enabled: boolean;
};

export async function POST(req: NextRequest) {
	const data: CreateEventSchema = await req.json();
	const supabase = createClient();
	const user = await supabase.auth.getUser();

	let { data: createEventResponse, error } = await supabase
		.from("events")
		.insert({
			name: data.name,
			organizer: user.data.user?.id,
			description: data.description,
			entry_price: data.entry_price,
			start_time: new Date(data.start_time).toISOString(),
			end_time: new Date(data.start_time).toISOString(),
			spaces_enabled: data.spaces_enabled,
			chat_enabled: data.chat_enabled,
		})
		.select();

	if (error) {
		console.log(error.code);
		return NextResponse.json(
			{ error: error.message },
			{ status: 500 }
		);
	}

	let { data: joinEventAsAdminResponse, error: adminJoinError } =
		await supabase.schema("connections").from("event_attendees").insert({
			// @ts-ignore
			event: createEventResponse[0].id,
			attendee: user.data.user?.id,
			role: "ORGANIZER",
		});

	if (adminJoinError) {
		console.log(adminJoinError.code);
		return NextResponse.json(
			{ error: adminJoinError.message },
			{ status: 500 }
		);
	}

	return NextResponse.json(
		{
			data: createEventResponse,
		},
		{
			status: 201,
		}
	);
}
