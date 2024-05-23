import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type SignupRequestSchema = {
	email: string;
	password: string;
};

export async function POST(req: NextRequest) {
	const supabase = createClient();
	const origin = headers().get("origin");
	const data: SignupRequestSchema = await req.json();

	let { error } = await supabase.auth.signUp({
		email: data.email,
		password: data.password,
		options: {
			emailRedirectTo: `${origin}/auth/callback`,
		},
	});

	if (error) {
		console.log(error);
		return NextResponse.json(
			{ message: "Could not authenticate user" },
			{ status: Number(error.code) }
		);
	}

	return NextResponse.json(
        { message: "Check email to continue sign in process" },
        { status: 200 }
    );
}