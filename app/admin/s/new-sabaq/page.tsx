"use client";
import CardWrapper from "@/components/CardWrapper";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SabaqSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import { useTransition } from "react";
import { CalendarIcon, Loader2 } from "lucide-react";
import { register } from "@/actions/register";
import { newSabaq } from "@/actions/new-sabaq";
import { getAdmins, getPadhawnaars } from "@/actions/data-fetching";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
const NewSabaqForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [admins, setAdmins] = useState<any>([]);
  const [padhawnaars, setPadhawnaars] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const admins = await getAdmins();

      const padhawnaars = await getPadhawnaars();
      setAdmins(admins);
      setPadhawnaars(padhawnaars);
    };
    fetchData();
  }, []);

  const form = useForm<z.infer<typeof SabaqSchema>>({
    resolver: zodResolver(SabaqSchema),
    defaultValues: {
      name: "",
      admins: [],
      nisaab: "",
      mode: "",
      startTime: "",
      startDate: new Date(),
      time: "",
      endTime: "",
      padhawnaar: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SabaqSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      newSabaq(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  return (
    <div className="mt-80 lg:mt-4 h-[90vh] flex items-center justify-center">
      <CardWrapper
        headerLabel="Create New Sabaq"
        backButton="Back to dashboard"
        showSocial={false}
        backButtonHref="/admin"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Sabaq Name */}
              <FormField
                control={form.control}
                name="name"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sabaq Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Sabaq Name" />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Nisaab */}
              <FormField
                control={form.control}
                name="nisaab"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nisaab</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Nisaab" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Nisaab 1", "Nisaab 2", "Nisaab 3"].map(
                            (nisaab) => (
                              <SelectItem key={nisaab} value={nisaab}>
                                {nisaab}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.nisaab?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Mode */}
              <FormField
                control={form.control}
                name="mode"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mode</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Mode of Sabaq" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Online", "Offline", "Hybrid"].map((mode) => (
                            <SelectItem key={mode} value={mode}>
                              {mode}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.mode?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Padhawnaar */}
              <FormField
                control={form.control}
                name="padhawnaar"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Padhawnaar</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Padhawnaar" />
                        </SelectTrigger>
                        <SelectContent>
                          {padhawnaars.map((padhawnaar: any) => (
                            <SelectItem
                              key={padhawnaar.id}
                              value={padhawnaar.id}
                            >
                              {padhawnaar.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.padhawnaar?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            {/* Attendance Section */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Start Date */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? format(new Date(field.value), "PPP")
                              : "Pick a date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Attendance Times */}
              <FormField
                control={form.control}
                name="startTime"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Start Time" type="time" />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.startTime?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="End Time" type="time" />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.endTime?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    <FormField
      control={form.control}
      name="time"
      disabled={isPending}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Sabaq Time</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Sabaq Time" type="time" />
          </FormControl>
          <FormMessage>
            {form.formState.errors.time?.message}
          </FormMessage>
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="admins"
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">Admins</FormLabel>
            <FormDescription>
              Select all the admins who will be in charge of this Sabaq.
            </FormDescription>
          </div>
          {admins.map((item: any) => (
            <FormField
              key={item.id}
              control={form.control}
              name="admins"
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.id])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== item.id
                                )
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {item.name}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
</div>

            <FormError message={error} />
            <FormSuccess message={success} />

            {/* Submit Button */}
            <Button
              disabled={isPending}
              type="submit"
              variant="default"
              className="w-full mt-6"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create Sabaq"
              )}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default NewSabaqForm;
