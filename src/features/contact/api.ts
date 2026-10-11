import { apiClient } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";

/** The contact form's payload. */
export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Sends a message through the site's contact form.
 *
 * The API validates it, records it and hands it to the farm by email. The
 * response is the same whether or not the mail provider is reachable, so a
 * visitor is never asked to resend because of a fault on the farm's side.
 *
 * The endpoint is anonymous and rate-limited per address.
 */
export async function submitContact(input: ContactInput): Promise<void> {
  await apiClient.post<void>(API.contact.submit, input);
}
