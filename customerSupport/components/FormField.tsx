import React from 'react'

import {FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormControl
  } from "./ui/form";
  import { Input } from "./ui/input";
// import { text } from 'stream/consumers';

/* eslint-disable @typescript-eslint/no-explicit-any */
const FormFIeld = ({ control, name, label, placeholder, type }: { 
    control: any; 
    name: string; 
    label: string; 
    placeholder: string; 
    type: string;
}) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input placeholder={placeholder} type={type} {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
);

export default FormFIeld