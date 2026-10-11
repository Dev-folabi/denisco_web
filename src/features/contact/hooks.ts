import { useMutation } from "@tanstack/react-query";
import { submitContact, type ContactInput } from "./api";

/** Sends one contact-form submission. */
export function useSubmitContact() {
  return useMutation({
    mutationFn: (input: ContactInput) => submitContact(input),
  });
}
