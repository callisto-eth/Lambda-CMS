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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dispatch, SetStateAction, useState } from 'react';

export default function AuthModal({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [authState, setAuthState] = useState<'signin' | 'signup'>('signin');
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger className="border border-[#FB4500] bg-transparent rounded-3xl text-md px-16 py-3.5 text-[#FB4500] hover:bg-[#FB4500] hover:text-white transition-all duration-200">
        Build your Event
      </DialogTrigger>
      <FormComponent
        setModalOpen={setModalOpen}
        authType={authState}
        setAuthState={setAuthState}
      />
    </Dialog>
  );
}

function FormComponent({
  authType,
  setAuthState,
  setModalOpen,
}: {
  authType: 'signin' | 'signup';
  setAuthState: (val: 'signin' | 'signup') => void;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const pageRouter = useRouter();
  async function onSubmit(formValues: z.infer<typeof authSchema>) {
    const resp = await fetch(`/api/auth/${authType}`, {
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
      setModalOpen(false);
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
      </div>
      <Tabs
        defaultValue="signin"
        className="w-full"
        onValueChange={(val: string) => {
          setAuthState(val as 'signin' | 'signup');
        }}
      >
        <TabsList className="grid w-full grid-cols-2 bg-transparent gap-x-1">
          <TabsTrigger
            value="signin"
            className="data-[state=active]:bg-white/20 py-2 data-[state=active]:text-white backdrop-blur-sm text-white rounded-xl bg-clip-padding backdrop-filter bg-opacity-10 border border-white border-opacity-10"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="data-[state=active]:bg-white/20 py-2 data-[state=active]:text-white backdrop-blur-sm text-white rounded-xl bg-clip-padding backdrop-filter bg-opacity-10 border border-white border-opacity-10"
          >
            Sign up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
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
                        value={field.value}
                        onChange={field.onChange}
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
                        value={field.value}
                        onChange={field.onChange}
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
        </TabsContent>
        <TabsContent value="signup">
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
                        value={field.value}
                        onChange={field.onChange}
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
                        value={field.value}
                        onChange={field.onChange}
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
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
}
