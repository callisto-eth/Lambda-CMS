'use client';

import { useForm } from 'react-hook-form';
import z from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SolarLogin3BoldDuotone } from './Icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

export default function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger className="border border-[#FB4500] bg-transparent rounded-3xl text-md px-16 py-3.5 text-[#FB4500] hover:bg-[#FB4500] hover:text-white transition-all duration-200">
        Build your Event
      </DialogTrigger>
      {formComponent()}
    </Dialog>
  );
}

function formComponent() {
  const pageRouter = useRouter();
  async function onSubmit(formValues: z.infer<typeof authSchema>) {
    const resp = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formValues.email,
        password: formValues.password,
      }),
    });

    if (resp.status === 200) {
      pageRouter.push('/@me');
    }
  }

  const authSchema = z.object({
    email: z.string(),
    password: z.string().min(8, {
      message: 'Minimum of 8 Characters is required',
    }),
  });

  const authForm = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
  });

  return (
    <DialogContent className="p-6 w-[350px] bg-black rounded-3xl text-white font-DM-Sans bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-white border-opacity-10">
      <SolarLogin3BoldDuotone className="text-6xl text-[#d83e08]" />
      <div className="leading-tight">
        <p className="text-3xl font-semibold">Welcome to Lambda</p>
        <p className="text-lg">Please sign up or sign in below</p>
      </div>
      <Form {...authForm}>
        <form
          className="space-y-2 font-DM-Sans"
          onSubmit={authForm.handleSubmit(onSubmit)}
        >
          <FormField
            name="email"
            control={authForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    {...field}
                    className="bg-transparent outline-none py-2.5 border border-white border-opacity-10 rounded-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={authForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
                    {...field}
                    className="bg-transparent outline-none py-2.5 border border-white border-opacity-10 rounded-xl"
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <Button
            type="submit"
            className="font-DM-Sans p-3 rounded-xl w-full bg-[#323132] text-md font-semibold text-[#b4b3b4] hover:bg-[#b4b3b4] hover:text-[#323132]"
          >
            Continue
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}
