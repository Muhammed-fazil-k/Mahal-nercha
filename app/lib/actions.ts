'use server';
import { db } from '@/config/firebase';
import { addDoc, collection, doc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const FormSchema = z.object({
  id: z.string(),
  name: z.string().min(2, { message: 'Must be 2 or more characters long' }),
  care_of: z.string().min(2, { message: 'Must be 2 or more characters long' }),
  clusterId: z.string({
    invalid_type_error: 'Please provide a Cluster',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than 0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  donated_at: z.string(),
});

const CreateDonation = FormSchema.omit({ id: true, donated_at: true });

export type State = {
  nerchaId: string;
  errors?: {
    name?: string[];
    care_of?: string[];
    clusterId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createDonation(prevState: State, formData: FormData) {
  const newState = {
    message: 'Success!',
    errors: {},
    nerchaId: prevState.nerchaId,
  };
  const validateField = CreateDonation.safeParse({
    name: formData.get('name'),
    care_of: formData.get('care_of'),
    clusterId: formData.get('clusterId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  if (!validateField.success) {
    return {
      errors: validateField.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Donation.',
      nerchaId: prevState.nerchaId,
    };
  }
  const { name, care_of, clusterId, amount, status } = validateField.data;
  const nerchaId = prevState.nerchaId;
  const nerchaListRef = doc(db, 'nercha_list', nerchaId);

  try {
    const docRef = await addDoc(collection(db, 'nercha_donations'), {
      name: name,
      care_of: care_of,
      donated_at: new Date(),
      status: status,
      amount: amount,
      cluster_id: clusterId,
      nercha_name: nerchaListRef,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
  const url = `/nercha/${nerchaId}`;
  revalidatePath(url);
  redirect(url);
  return newState;
}
